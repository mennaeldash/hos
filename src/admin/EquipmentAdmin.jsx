import CrudAdmin from "./CrudAdmin";

import PlaceholderImage from "@/components/PlaceholderImage";

import {
  createEquipment,
  deleteEquipment,
  getEquipment,
  updateEquipment,
} from "@/services/equipment";

export default function EquipmentAdmin() {
  return (
    <CrudAdmin
      title="خدمة"
      imageType="device"

      searchKeys={[
        "name",
        "description",
      ]}

      fetchItems={
        getEquipment
      }

      createItem={
        createEquipment
      }

      updateItem={
        updateEquipment
      }

      deleteItem={
        deleteEquipment
      }

      cardView

      renderCard={(
        item
      ) => (
        <div className="text-center">

          <PlaceholderImage
            type="device"
            src={
              item.image_url ||
              item.imageUrl
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

          <h3 className="font-bold text-slate-800 text-sm">
            {item.name}
          </h3>

          {item.description && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {
                item.description
              }
            </p>
          )}

        </div>
      )}

      columns={[
        {
          key: "name",
          label:
            "اسم الخدمة",
          required: true,
          placeholder:
            "اسم الخدمة",
        },

        {
          key:
            "description",
          label:
            "الوصف",
          type:
            "textarea",
          placeholder:
            "وصف الخدمة",
        },

        {
          /*
            CrudAdmin بيحط الـFile
            داخل نفس الـkey.

            equipment.js بعد كده
            بياخده ويبعت للBackend
            باسم Image.
          */
          key:
            "image_url",
          label:
            "الصورة",
          type:
            "image",
        },
      ]}
    />
  );
}