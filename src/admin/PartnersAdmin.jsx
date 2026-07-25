import CrudAdmin from './CrudAdmin';
import PlaceholderImage from '@/components/PlaceholderImage';
import {
  createPartner,
  deletePartner,
  getPartners,
  updatePartner,
} from '@/services/partners';

export default function PartnersAdmin() {
  return (
    <CrudAdmin
      title="شريك"
      imageType="company"
      searchKeys={['name']}
      fetchItems={getPartners}
      createItem={createPartner}
      updateItem={updatePartner}
      deleteItem={deletePartner}
      cardView
      renderCard={(item) => (
        <div className="text-center">
          <PlaceholderImage type="company" src={item.logo_url} alt={item.name} className="w-16 h-16 mx-auto mb-3" rounded="rounded-2xl" />
          <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
        </div>
      )}
      columns={[
        { key: 'name', label: 'اسم الشركة', required: true, placeholder: 'اسم الشركة' },
        { key: 'logo_url', label: 'الشعار', type: 'image' },
        { key: 'sort_order', label: 'الترتيب', type: 'number' },
      ]}
    />
  );
}

