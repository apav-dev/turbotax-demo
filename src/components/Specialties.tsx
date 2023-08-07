import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  HomeIcon,
  ReceiptRefundIcon,
  UsersIcon,
  PresentationChartLineIcon,
  GiftIcon,
  PaperAirplaneIcon,
  GlobeAsiaAustraliaIcon,
  GlobeAmericasIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

const actions = [
  {
    title: "Request time off",
    href: "#",
    icon: PresentationChartLineIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Benefits",
    href: "#",
    icon: HomeIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule a one-on-one",
    href: "#",
    icon: GiftIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Payroll",
    href: "#",
    icon: GlobeAsiaAustraliaIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Submit an expense",
    href: "#",
    icon: HomeModernIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    title: "Training",
    href: "#",
    icon: GlobeAmericasIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

export interface SpecialtiesProps {
  specialties?: string[];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Specialties({ specialties }: SpecialtiesProps) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0
              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
              : "",
            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
            actionIdx === actions.length - 1
              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
              : "",
            "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                "inline-flex rounded-lg p-3 ring-4 ring-white"
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              <a href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {specialties?.[actionIdx]}
              </a>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
