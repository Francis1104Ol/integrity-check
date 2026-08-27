import { Mail, Shield, User, Calendar } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

import { useProfile } from "../../hooks/useProfile";

export default function Profile() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <DashboardLayout>
        <PageHeader
          title="Profile"
          subtitle="Manage your account information."
        />

        <Card>
          <div className="py-10 text-center text-slate-500">
            Loading profile...
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <PageHeader
          title="Profile"
          subtitle="Manage your account information."
        />

        <Card>
          <div className="py-10 text-center text-slate-500">
            Unable to load profile information.
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Profile"
        subtitle="Manage your account information."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
              {profile.firstName?.charAt(0)}
              {profile.lastName?.charAt(0)}
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              {profile.firstName} {profile.lastName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {profile.email}
            </p>

            <div className="mt-4">
              <Badge color="blue">
                {profile.role || "USER"}
              </Badge>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  profile.isActive
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              <span className="text-sm text-slate-600">
                {profile.isActive
                  ? "Active account"
                  : "Inactive account"}
              </span>
            </div>
          </div>
        </Card>

        {/* Account Information */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">
            Account Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your registered account details.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {/* First Name */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <User
                  size={20}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    First Name
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {profile.firstName || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Last Name */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <User
                  size={20}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Last Name
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {profile.lastName || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-slate-200 p-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <Mail
                  size={20}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Email Address
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {profile.email || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <Shield
                  size={20}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Role
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {profile.role || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Last Login */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <Calendar
                  size={20}
                  className="text-blue-600"
                />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Last Login
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {profile.lastLogin
                      ? new Date(
                          profile.lastLogin
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Never"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}