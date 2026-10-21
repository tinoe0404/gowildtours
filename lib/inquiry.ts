export interface ParsedInquiry {
  isPackageInquiry: boolean;
  packageTitle?: string | null;
  travelers?: number | string | null;
  preferredDate?: string | null;
  customerNote: string;
}

export function parseInquiryDetails(msg: {
  message: string;
  packageTitle?: string | null;
  travelers?: number | null;
  preferredDate?: string | null;
  inquiryType?: string | null;
}): ParsedInquiry {
  const isPackageInquiry =
    msg.inquiryType === 'Safari Package Info' ||
    Boolean(msg.packageTitle) ||
    msg.message.includes('--- Trip Details ---') ||
    msg.message.includes('--- Package Inquiry Details ---');

  let packageTitle = msg.packageTitle || null;
  let travelers: number | string | null = msg.travelers ?? null;
  let preferredDate = msg.preferredDate || null;

  if (!packageTitle) {
    const pkgMatch = msg.message.match(/Package:\s*([^\n]+)/i);
    if (pkgMatch) packageTitle = pkgMatch[1].trim();
  }

  if (!travelers) {
    const travMatch = msg.message.match(/Travelers:\s*([^\n]+)/i);
    if (travMatch) travelers = travMatch[1].trim();
  }

  if (!preferredDate) {
    const dateMatch = msg.message.match(/Preferred Date:\s*([^\n]+)/i);
    if (dateMatch) preferredDate = dateMatch[1].trim();
  }

  let customerNote = msg.message;
  if (customerNote.includes('--- Trip Details ---')) {
    customerNote = customerNote.split('--- Trip Details ---')[0].replace(/^Message:\s*/i, '').trim();
  } else if (customerNote.includes('--- Package Inquiry Details ---')) {
    customerNote = customerNote.split('--- Package Inquiry Details ---')[0].replace(/^Message:\s*/i, '').trim();
  }

  return {
    isPackageInquiry,
    packageTitle,
    travelers,
    preferredDate,
    customerNote: customerNote || '(No extra notes provided)',
  };
}
