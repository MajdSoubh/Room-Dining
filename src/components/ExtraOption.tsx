// components/ExtraOptions.tsx
import { FC } from "react";

interface ExtraOption {
  id: number;
  name: string;
  option_has_price: boolean;
  price?: number;
  currency?: string;
}

interface ExtraSection {
  extra_id: number;
  name: string;
  is_active: boolean;
  is_required: boolean;
  extra_type_name: "radio" | "checkbox";
  option: ExtraOption[];
}
interface OrderDetails {
  quantity: number;
  extras: Array<{
    extra_id: number;
    option_id: number;
  }>;
}
interface ExtraOptionsProps {
  extraSection: ExtraSection;
  selectedExtras: OrderDetails["extras"];
  onExtraSelect: (
    extraId: number,
    optionId: number,
    type: "radio" | "checkbox"
  ) => void;
}

export const ExtraOptions: FC<ExtraOptionsProps> = ({
  extraSection,
  selectedExtras,
  onExtraSelect,
}) => {
  const isOptionSelected = (extraId: number, optionId: number) => {
    return selectedExtras.some(
      (e) => e.extra_id === extraId && e.option_id === optionId
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      {extraSection.is_active && (
        <>
          <div className="bg-background-primary/70 w-full rounded text-black/80 text-md px-3 py-2 font-[500] flex justify-between">
            <div>{extraSection.name}</div>
            {extraSection.is_required && (
              <span className="text-red-700">Required</span>
            )}
          </div>
          {extraSection.option.map((option) => (
            <div
              key={option.id}
              className="w-full px-2 text-black/80 flex justify-between"
            >
              <span>{option.name}</span>
              <div className="flex items-center gap-2">
                {option.option_has_price && (
                  <span>
                    + {option.currency} {option.price}
                  </span>
                )}
                <input
                  type={extraSection.extra_type_name}
                  name={`extra-${extraSection.extra_id}`}
                  checked={isOptionSelected(extraSection.extra_id, option.id)}
                  onChange={() =>
                    onExtraSelect(
                      extraSection.extra_id,
                      option.id,
                      extraSection.extra_type_name
                    )
                  }
                  className="w-4 h-4 accent-primary"
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
