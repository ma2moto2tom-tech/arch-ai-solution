import { NextRequest, NextResponse } from "next/server";

/**
 * Stripe Checkout Session作成API
 * サブスクリプション契約・プラン変更のためのチェックアウトURL生成
 */

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER || "price_starter_demo",
  professional: process.env.STRIPE_PRICE_PROFESSIONAL || "price_professional_demo",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || "price_enterprise_demo",
};

export async function POST(req: NextRequest) {
  try {
    const { plan, tenantId } = await req.json();

    if (!plan || !PRICE_IDS[plan]) {
      return NextResponse.json(
        { success: false, error: "Invalid plan" },
        { status: 400 }
      );
    }

    // TODO: Stripe SDK実装
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    //
    // // テナントのStripe Customer IDを取得（なければ作成）
    // const supabase = await createServiceRoleClient();
    // const { data: tenant } = await supabase.from('tenants').select().eq('id', tenantId).single();
    //
    // let customerId = tenant?.stripe_customer_id;
    // if (!customerId) {
    //   const customer = await stripe.customers.create({ metadata: { tenantId } });
    //   customerId = customer.id;
    //   await supabase.from('tenants').update({ stripe_customer_id: customerId }).eq('id', tenantId);
    // }
    //
    // const session = await stripe.checkout.sessions.create({
    //   customer: customerId,
    //   payment_method_types: ['card'],
    //   line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
    //   mode: 'subscription',
    //   success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/billing?success=true`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/billing?canceled=true`,
    //   metadata: { tenantId, plan },
    // });

    return NextResponse.json({
      success: true,
      // checkoutUrl: session.url,
      checkoutUrl: "/dashboard/billing?demo=true",
      plan,
      demoMode: true,
      note: "Stripe APIキーを設定すると実際の課金が有効になります",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
