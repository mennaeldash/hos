import CrudAdmin from "./CrudAdmin";
import PlaceholderImage from "@/components/PlaceholderImage";

import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "@/services/departments";

export default function DepartmentsAdmin() {
  return (
    <CrudAdmin
      title="قسم"
      imageType="department"
      searchKeys={["name"]}

      fetchItems={getDepartments}
      createItem={createDepartment}
      updateItem={updateDepartment}
      deleteItem={deleteDepartment}

      cardView

      renderCard={(item) => (
        <div className="text-center">

          <PlaceholderImage
            type="department"
            src={item.image_url}
            alt={item.name}
            className="w-16 h-16 mx-auto mb-3"
            rounded="rounded-2xl"
          />

          <h3 className="font-bold text-slate-800">
            {item.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {item.description}
          </p>

        </div>
      )}

      columns={[
        {
          key: "name",
          label: "اسم القسم",
          required: true,
          placeholder: "اسم القسم",
        },

        {
          key: "description",
          label: "الوصف",
          type: "textarea",
          placeholder: "وصف القسم",
        },

        {
          key: "image_url",
          label: "صورة القسم",
          type: "image",
        },
      ]}
    />
  );
}