import CrudAdmin from './CrudAdmin';
import PlaceholderImage from '@/components/PlaceholderImage';
import {
  createEquipment,
  deleteEquipment,
  getEquipment,
  updateEquipment,
} from '@/services/equipment';

const categoryOptions = [
  { value: 'radiology', label: 'أشعة' },
  { value: 'icu', label: 'عناية مركزة' },
  { value: 'laboratory', label: 'مختبرات' },
  { value: 'operating', label: 'غرف عمليات' },
  { value: 'emergency', label: 'طوارئ' },
];

export default function EquipmentAdmin() {
  return (
    <CrudAdmin
      title="جهاز"
      imageType="device"
      searchKeys={['name', 'category']}
      fetchItems={getEquipment}
      createItem={createEquipment}
      updateItem={updateEquipment}
      deleteItem={deleteEquipment}
      cardView
      renderCard={(item) => (
        <div className="text-center">
          <PlaceholderImage type="device" src={item.image_url} alt={item.name} className="w-16 h-16 mx-auto mb-3" rounded="rounded-2xl" />
          <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
        </div>
      )}
      columns={[
        { key: 'name', label: 'اسم الجهاز', required: true, placeholder: 'اسم الجهاز' },
        { key: 'description', label: 'الوصف', type: 'textarea', placeholder: 'وصف الجهاز' },
        { key: 'category', label: 'الفئة', type: 'select', required: true, options: categoryOptions },
        { key: 'image_url', label: 'الصورة', type: 'image' },
        { key: 'sort_order', label: 'الترتيب', type: 'number' },
      ]}
    />
  );
}

