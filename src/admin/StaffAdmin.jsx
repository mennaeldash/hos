import CrudAdmin from "./CrudAdmin";
import PlaceholderImage from "@/components/PlaceholderImage";

import {
  createStaff,
  deleteStaff,
  getStaff,
  updateStaff,
} from "@/services/staff";

export default function StaffAdmin() {
  return (
    <CrudAdmin
      title="موظف"
      imageType="admin"
      searchKeys={[
        "name",
        "position",
      ]}
      fetchItems={getStaff}
      createItem={createStaff}
      updateItem={updateStaff}
      deleteItem={deleteStaff}
      cardView
      renderCard={(item) => (
        <div className="text-center">
          <PlaceholderImage
            type="admin"
            src={item.image_url}
            alt={item.name}
            className="w-20 h-20 mx-auto mb-3"
            rounded="rounded-full"
          />

          <h3 className="font-bold text-slate-800">
            {item.name}
          </h3>

          <p className="text-sm text-primary-600 font-bold">
            {item.position}
          </p>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {item.description}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            ترتيب الظهور:{" "}
            {item.sort_order ?? 0}
          </p>
        </div>
      )}
      columns={[
        {
          key: "name",
          label: "الاسم",
          required: true,
          placeholder: "اسم الموظف",
        },
        {
          key: "position",
          label: "المنصب",
          required: true,
          placeholder: "المنصب",
        },
        {
          key: "description",
          label: "الوصف",
          type: "textarea",
          placeholder: "وصف مختصر",
        },
        {
          key: "sort_order",
          label: "ترتيب الظهور",
          type: "number",
          required: true,
          placeholder: "مثال: 1",
        },
        {
          key: "image_url",
          label: "الصورة",
          type: "image",
        },
      ]}
    />
  );
}