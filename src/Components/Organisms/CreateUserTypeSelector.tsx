import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconChevronRight } from "@tabler/icons-react";
import { userTypeSelectorOptions } from "../../Config/UserCreationConfig/UserConfig";

/** Network Creation: pick the network level to create, shown in hierarchy order. */
const CreateUserTypeSelector = () => {
  const navigate = useNavigate();

  const handleUserTypeClick = (type: string) => {
    navigate(`/management/user/create/${type}`);
  };

  return (
    <div className="mt-2 flex flex-col gap-6">
      {/* Hierarchy order */}
      <div className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-slate-500">
        {userTypeSelectorOptions.map((type, index) => (
          <span key={type.type} className="flex items-center gap-1.5">
            {index > 0 && <IconChevronRight size={14} className="text-slate-400" />}
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">{type.label}</span>
          </span>
        ))}
      </div>

      {/* One card per level */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {userTypeSelectorOptions.map((type, index) => (
          <button
            key={type.type}
            type="button"
            onClick={() => handleUserTypeClick(type.type)}
            className="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-emerald-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <div className="flex items-start justify-between">
              {type.icon}
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Level {index + 1}
              </span>
            </div>
            <div>
              <div className="text-[16px] font-bold text-slate-900">{type.label}</div>
              <p className="mt-1 text-[13px] leading-snug text-slate-500">{type.description}</p>
            </div>
            <div className="mt-auto flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700">
              Create {type.label}
              <IconArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CreateUserTypeSelector;
