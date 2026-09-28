import CrudAdmin from "./CrudAdmin";
import PlaceholderImage from "@/components/PlaceholderImage";

import {
  createPartner,
  deletePartner,
  getPartners,
  updatePartner,
} from "@/services/partners";

export default function PartnersAdmin() {
  return (
    <CrudAdmin
      title="شريك"
      imageType="company"

      /* البحث بالاسم أو الوصف */
      searchKeys={[
        "name",
        "description",
      ]}

      fetchItems={
        getPartners
      }

      createItem={
        createPartner
      }

      updateItem={
        updatePartner
      }

      deleteItem={
        deletePartner
      }

      cardView

      /* =====================================================
         CARD
      ====================================================== */

      renderCard={(
        item
      ) => (
        <div className="text-center">

          <PlaceholderImage
            type="company"
            src={
              item.logo_url
            }
            alt={
              item.name
            }
            className="
              w-16
              h-16
              mx-auto
              mb-3
            "
            rounded="rounded-2xl"
          />

          <h3
            className="
              font-bold
              text-slate-800
              text-sm
            "
          >
            {item.name}
          </h3>

          {item.description && (
            <p
              className="
                mt-2
                text-xs
                leading-6
                text-slate-500
                line-clamp-3
              "
            >
              {
                item.description
              }
            </p>
          )}

        </div>
      )}

      /* =====================================================
         FORM FIELDS
      ====================================================== */

      columns={[
        {
          key: "name",
          label:
            "اسم الشركة",
          required: true,
          placeholder:
            "اسم الشركة",
        },

        {
          key:
            "description",
          label:
            "الوصف",
          type:
            "textarea",
          placeholder:
            "اكتب وصف الشركة أو تفاصيل التعاقد...",
        },

        {
          key:
            "logo_url",
          label:
            "الشعار",
          type:
            "image",
        },
      ]}
    />
  );
}