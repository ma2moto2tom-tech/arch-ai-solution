import { NextRequest, NextResponse } from "next/server";

/**
 * Stripe Webhook処理
 * サブスクリプション作成・更新・キャンセルを処理
 */

// Stripeからの生のボディが必要
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
    }

    // TODO: Stripe SDK実装
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // );
    //
    // switch (event.type) {
    //   case 'customer.subscription.created':
    //   case 'customer.subscription.updated':
    //     // サブスクリプション情報をDBに保存
    //     const subscription = event.data.object;
    //     await updateTenantSubscription(subscription);
    //     break;
    //
    //   case 'customer.subscription.deleted':
    //     // サブスクリプションをキャンセル済みに更新
    //     await cancelTenantSubscription(event.data.object);
    //     break;
    //
    //   case 'invoice.payment_succeeded':
    //     // 月次使用量をリセット
    //     await resetMonthlyUsage(event.data.object);
    //     break;
    //
    //   case 'invoice.payment_failed':
    //     // 支払い失敗通知
    //     await notifyPaymentFailed(event.data.object);
    //     break;
    // }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
