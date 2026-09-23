/*
 * Web3Forms delivery (https://web3forms.com). Submissions are sent from the browser, which is
 * what the free plan supports; the access key is designed to be public and only identifies the
 * inbox that receives the email.
 */
const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";

export const web3formsConfigured = ACCESS_KEY.length > 0;

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitToWeb3Forms({
  subject,
  fromName,
  replyTo,
  botcheck,
  fields,
}: {
  subject: string;
  fromName: string;
  replyTo: string;
  /** Honeypot value; must be empty for real people. */
  botcheck: string;
  fields: Record<string, string>;
}): Promise<SubmitResult> {
  if (!web3formsConfigured) {
    return { ok: false, error: "Online enquiries are temporarily unavailable. Please email or call us instead." };
  }
  // Bots that fill the hidden field get a silent "success" so they don't adapt.
  if (botcheck) return { ok: true };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject,
        from_name: fromName,
        replyto: replyTo,
        ...fields,
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!res.ok || !json.success) {
      return { ok: false, error: json.message || "Something went wrong sending your message. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Check your connection and try again." };
  }
}
