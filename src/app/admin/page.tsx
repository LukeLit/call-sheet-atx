import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, PREVIEW_COOKIE, verifyAdminCookie } from "@/lib/admin/auth";
import { parseModelList } from "@/lib/muse/models";
import { canWriteEdgeConfig, readLiveModels } from "@/lib/muse/store";
import { AdminChrome } from "./AdminChrome";
import { LoginForm } from "./LoginForm";
import { ModelsForm } from "./ModelsForm";
import { NotConfigured } from "./NotConfigured";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Open Call ops",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return (
      <AdminChrome>
        <NotConfigured />
      </AdminChrome>
    );
  }

  const jar = cookies();
  const signedIn = await verifyAdminCookie(jar.get(ADMIN_COOKIE)?.value, secret);
  if (!signedIn) {
    return (
      <AdminChrome>
        <LoginForm error={searchParams.error === "1"} />
      </AdminChrome>
    );
  }

  const live = await readLiveModels();
  const preview = parseModelList(jar.get(PREVIEW_COOKIE)?.value);

  return (
    <AdminChrome signedIn>
      <ModelsForm
        live={live}
        preview={preview}
        writable={canWriteEdgeConfig()}
      />
    </AdminChrome>
  );
}
