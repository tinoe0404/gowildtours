/**
 * PayPal Server-Side Utility
 * 
 * Handles all PayPal REST API interactions server-side.
 * NEVER import this file from client components — it uses PAYPAL_CLIENT_SECRET.
 */

import { env } from "@/lib/env";

const PAYPAL_API_BASE = env.PAYPAL_API_BASE;
const PAYPAL_CLIENT_ID = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = env.PAYPAL_CLIENT_SECRET;

/** Deposit percentage (30%) */
export const DEPOSIT_PERCENTAGE = 0.30;

/**
 * Generate an OAuth2 access token using client credentials grant.
 * Tokens are short-lived; we generate one per API call for simplicity.
 */
async function getAccessToken(): Promise<string> {
    const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentials}`,
        },
        body: "grant_type=client_credentials",
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("PayPal OAuth error:", errorBody);
        throw new Error("Failed to obtain PayPal access token");
    }

    const data = await response.json();
    return data.access_token;
}

/**
 * Create a PayPal order for the given deposit amount.
 * Returns the PayPal order ID for client-side approval.
 */
export async function createPayPalOrder(
    depositAmount: number,
    description: string,
    bookingReference: string
): Promise<{ id: string }> {
    const accessToken = await getAccessToken();

    // Round to 2 decimal places for PayPal
    const amount = depositAmount.toFixed(2);

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: bookingReference,
                    description,
                    amount: {
                        currency_code: "USD",
                        value: amount,
                    },
                },
            ],
            // Disable shipping address collection (not needed for tours)
            application_context: {
                shipping_preference: "NO_SHIPPING",
                brand_name: "Go Wild Tours",
            },
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("PayPal createOrder error:", errorBody);
        throw new Error("Failed to create PayPal order");
    }

    const data = await response.json();
    return { id: data.id };
}

/**
 * Capture an approved PayPal order.
 * Called after the user approves payment in the PayPal popup.
 */
export async function capturePayPalOrder(orderId: string): Promise<{
    id: string;
    status: string;
    captureId: string;
    amount: string;
    payerEmail: string;
}> {
    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("PayPal captureOrder error:", errorBody);
        throw new Error("Failed to capture PayPal order");
    }

    const data = await response.json();

    // Extract capture details from the response
    const capture = data.purchase_units?.[0]?.payments?.captures?.[0];

    return {
        id: data.id,
        status: data.status,
        captureId: capture?.id || "",
        amount: capture?.amount?.value || "0",
        payerEmail: data.payer?.email_address || "",
    };
}
