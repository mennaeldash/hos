// TODO: Replace with database/API calls when backend is connected
// Central mock data store for the front-end only application

export const mockDepartments = [
  { id: '1', name: 'القلب والأوعية الدموية', description: 'تشخيص وعلاج أمراض القلب والشرايين والأوعية الدموية', icon: 'heart-pulse', slug: 'cardiology', image_url: null, sort_order: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'الباطنة', description: 'تشخيص وعلاج الأمراض الباطنية العامة', icon: 'stethoscope', slug: 'internal-medicine', image_url: null, sort_order: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'أمراض الجهاز الهضمي والكبد', description: 'تشخيص وعلاج أمراض الجهاز الهضمي والكبد والمناظير', icon: 'stethoscope', slug: 'gastroenterology', image_url: null, sort_order: 3, created_at: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'السكر والغدد الصماء', description: 'تشخيص وعلاج أمراض السكر والغدد الصماء', icon: 'activity', slug: 'diabetes-endocrinology', image_url: null, sort_order: 4, created_at: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'النساء والتوليد', description: 'صحة المرأة والولادة وتأخر الإنجاب', icon: 'flower', slug: 'obstetrics-gynecology', image_url: null, sort_order: 5, created_at: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'جراحة العظام', description: 'جراحة العظام والمفاصل والعمود الفقري', icon: 'bone', slug: 'orthopedic', image_url: null, sort_order: 6, created_at: '2024-01-01T00:00:00Z' },
  { id: '7', name: 'الجراحة العامة', description: 'الجراحة العامة وجراحة المناظير', icon: 'scissors', slug: 'general-surgery', image_url: null, sort_order: 7, created_at: '2024-01-01T00:00:00Z' },
  { id: '8', name: 'جراحة الأوعية الدموية', description: 'جراحة الأوعية الدموية والدوالي', icon: 'droplet', slug: 'vascular-surgery', image_url: null, sort_order: 8, created_at: '2024-01-01T00:00:00Z' },
  { id: '9', name: 'جراحة التجميل', description: 'جراحة التجميل والحروق وجراحات تنسيق القوام', icon: 'smile', slug: 'plastic-surgery', image_url: null, sort_order: 9, created_at: '2024-01-01T00:00:00Z' },
  { id: '10', name: 'جراحة الأورام', description: 'جراحة الأورام واستئصال الأورام السرطانية', icon: 'scissors', slug: 'surgical-oncology', image_url: null, sort_order: 10, created_at: '2024-01-01T00:00:00Z' },
  { id: '11', name: 'الطب النفسي', description: 'تشخيص وعلاج الأمراض النفسية وعلاج الإدمان', icon: 'brain', slug: 'psychiatry', image_url: null, sort_order: 11, created_at: '2024-01-01T00:00:00Z' },
];

export const mockDoctors = [
  {
    id: '1', name: 'أ.د. محمد جمال محمد موسى', specialty: 'مدرس القلب والأوعية الدموية واستشاري القلب والقسطرة القلبية',
    qualification: 'مدرس القلب والأوعية الدموية - جامعة الفيوم',
    experience_years: 20, bio: 'استشاري القلب والقسطرة القلبية - متخصص في تشخيص وعلاج أمراض القلب والشرايين التاجية والقسطرة التداخلية',
    office_number: 'عيادة 101', department_id: '1', image_url: '/../public/images/magdy.jpeg', phone: '0501234567', email: 'dr.mohamed.gamal@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 1, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2', name: 'د. عزت عيسى', specialty: 'استشاري أمراض الباطنة والسكر',
    qualification: 'استشاري أمراض الباطنة والسكر',
    experience_years: 18, bio: 'استشاري أمراض الباطنة والسكر - متخصص في تشخيص وعلاج الأمراض الباطنية المزمنة وأمراض السكر والغدد',
    office_number: 'عيادة 201', department_id: '2', image_url: '/../public/images/ezzat.jpeg', phone: '0501234568', email: 'dr.ezzat.issa@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 2, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3', name: 'أ.د. طارق إبراهيم', specialty: 'أستاذ أمراض الجهاز الهضمي والكبد والمناظير',
    qualification: 'أستاذ أمراض الجهاز الهضمي والكبد والمناظير - كلية الطب جامعة الفيوم',
    experience_years: 25, bio: 'أستاذ أمراض الجهاز الهضمي والكبد والمناظير - متخصص في تشخيص وعلاج أمراض الكبد والجهاز الهضمي والمناظير الطبية',
    office_number: 'عيادة 301', department_id: '3', image_url: '/../public/images/tarek.jpeg', phone: '0501234569', email: 'dr.tarek.ibrahim@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 3, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4', name: 'د. سارة محمد عبدالستار', specialty: 'مدرس واستشاري أمراض الجهاز الهضمي والكبد والمناظير',
    qualification: 'مدرس واستشاري أمراض الجهاز الهضمي والكبد والمناظير',
    experience_years: 12, bio: 'مدرس واستشاري الجهاز الهضمي والكبد - متخصصة في تشخيص وعلاج أمراض الكبد والجهاز الهضمي والمناظير',
    office_number: 'عيادة 302', department_id: '3', image_url: '/../public/images/sara.jpeg', phone: '0501234570', email: 'dr.sara.abdelsattar@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 4, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5', name: 'د. معتز صالح جمعة', specialty: 'استشاري أمراض السكر والغدد الصماء',
    qualification: 'زميل الكلية الملكية البريطانية للتخصص الدقيق لأمراض السكر والغدد الصماء - ماجستير أمراض السكر جامعة عين شمس',
    experience_years: 15, bio: 'استشاري أمراض السكر والغدد الصماء - زميل الكلية الملكية البريطانية للتخصص الدقيق لأمراض السكر والغدد الصماء',
    office_number: 'عيادة 401', department_id: '4', image_url: '/../public/images/moataz.jpeg', phone: '0501234571', email: 'dr.moatz.saleh@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 5, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6', name: 'د. عبد الرحمن مجدي', specialty: 'استشاري النساء والتوليد وتأخر الإنجاب',
    qualification: 'استشاري النساء والتوليد وتأخر الإنجاب - استشاري الأشعة التداخلية وصحة الجنين',
    experience_years: 16, bio: 'استشاري النساء والتوليد وتأخر الإنجاب - متخصص في الأشعة التداخلية وصحة الجنين وعلاج العقم',
    office_number: 'عيادة 501', department_id: '5', image_url: '/../public/images/a.magdy.jpeg', phone: '0501234572', email: 'dr.abdelrahman.megdi@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 6, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7', name: 'د. أحمد والي', specialty: 'استشاري جراحة العظام والعمود الفقري',
    qualification: 'استشاري جراحة العظام والعمود الفقري',
    experience_years: 20, bio: 'استشاري جراحة العظام والعمود الفقري - متخصص في جراحات العظام والمفاصل والعمود الفقري',
    office_number: 'عيادة 601', department_id: '6', image_url: '/../public/images/waly.jpeg', phone: '0501234573', email: 'dr.ahmed.waly@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 7, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8', name: 'أ.د. أحمد عبد الرحمن', specialty: 'استشاري الجراحة العامة',
    qualification: 'استشاري الجراحة العامة وجراحة المناظير',
    experience_years: 22, bio: 'استشاري الجراحة العامة - متخصص في الجراحة العامة وجراحة المناظير وجراحات البطن',
    office_number: 'عيادة 701', department_id: '7', image_url: '/../public/images/a.magdy.jpeg', phone: '0501234574', email: 'dr.ahmed.abdelrahman@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 8, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '9', name: 'د. إبراهيم مدين', specialty: 'استشاري جراحة الأوعية الدموية',
    qualification: 'دكتوراه في جراحة الأوعية الدموية',
    experience_years: 14, bio: 'استشاري جراحة الأوعية الدموية - متخصص في جراحات الأوعية الدموية والدوالي وجراحات الشرايين',
    office_number: 'عيادة 801', department_id: '8', image_url: '/../public/images/mdian.jpeg', phone: '0501234575', email: 'dr.ibrahim.maden@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 9, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '10', name: 'د. أحمد حمدي الأدور', specialty: 'مدرس واستشاري جراحة التجميل والحروق',
    qualification: 'دكتوراه جراحة التجميل والإصلاح والحروق - زميل كلية الجراحين الملكية بإنجلترا',
    experience_years: 15, bio: 'مدرس واستشاري جراحة التجميل والحروق وجراحات تنسيق القوام - زميل كلية الجراحين الملكية بإنجلترا',
    office_number: 'عيادة 901', department_id: '9', image_url: '/../public/images/hamdy.jpeg', phone: '0501234576', email: 'dr.ahmed.elador@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 10, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '11', name: 'د. محمد إبراهيم أبو سعاد', specialty: 'أستاذ جراحة الأورام',
    qualification: 'أستاذ جراحة الأورام بكلية الطب - جامعة الفيوم',
    experience_years: 25, bio: 'أستاذ جراحة الأورام - متخصص في جراحات الأورام واستئصال الأورام السرطانية وجراحات الأورام المتقدمة',
    office_number: 'عيادة 1001', department_id: '10', image_url: '/../public/images/soaad.jpeg', phone: '0501234577', email: 'dr.mohamed.abosoad@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 11, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '12', name: 'أ.د. محمد موسى', specialty: 'أستاذ جراحة العظام والعمود الفقري والمناظير',
    qualification: 'أستاذ جراحة العظام والعمود الفقري والمناظير بكلية الطب جامعة الفيوم',
    experience_years: 25, bio: 'جراحات إصلاح تشوهات العمود الفقري - جراحات مناظير العمود الفقري - متخصص في جراحة العظام والعمود الفقري والمناظير',
    office_number: 'عيادة 602', department_id: '6', image_url: '/../public/images/moussa.jpeg', phone: '0501234578', email: 'dr.mohamed.moussa@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 12, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '13', name: 'أ.د. عصام على حسن', specialty: 'أستاذ أمراض الجهاز الهضمي والكبد والمناظير',
    qualification: 'أستاذ أمراض الجهاز الهضمي والكبد والمناظير بكلية طب الفيوم',
    experience_years: 25, bio: 'أستاذ أمراض الجهاز الهضمي والكبد والمناظير - متخصص في تشخيص وعلاج أمراض الكبد والجهاز الهضمي والمناظير الطبية',
    office_number: 'عيادة 303', department_id: '3', image_url: '/../public/images/essam.jpeg', phone: '0501234579', email: 'dr.essam.ali@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 13, created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '14', name: 'د. أحمد راغب', specialty: 'أخصائي الطب النفسي وعلاج الإدمان',
    qualification: 'مدرس مساعد بكلية الطب – قسم الطب النفسي - أخصائي الطب النفسي وعلاج الإدمان',
    experience_years: 10, bio: 'أخصائي الطب النفسي وعلاج الإدمان - مدرس مساعد بكلية الطب – قسم الطب النفسي - متخصص في تشخيص وعلاج الأمراض النفسية وعلاج الإدمان',
    office_number: 'عيادة 1101', department_id: '11', image_url: '/../public/images/rageb.jpeg', phone: '0501234580', email: 'dr.ahmed.ragheb@hospital.sa',
    status: 'active', is_deleted: false, sort_order: 14, created_at: '2024-01-01T00:00:00Z'
  },
];
export const mockDoctorSchedules = [
  { id: '1', doctor_id: '1', working_days: ['sunday'], start_time: '10:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '2', doctor_id: '2', working_days: ['saturday', 'monday', 'wednesday'], start_time: '09:00', end_time: '15:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '3', doctor_id: '3', working_days: ['sunday'], start_time: '10:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '4', doctor_id: '4', working_days: ['saturday', 'monday'], start_time: '11:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '5', doctor_id: '5', working_days: ['sunday', 'tuesday', 'thursday'], start_time: '10:00', end_time: '15:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '6', doctor_id: '6', working_days: ['sunday'], start_time: '10:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '7', doctor_id: '7', working_days: ['saturday'], start_time: '09:00', end_time: '13:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '8', doctor_id: '8', working_days: ['monday', 'thursday'], start_time: '10:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '9', doctor_id: '9', working_days: ['sunday', 'tuesday'], start_time: '17:00', end_time: '20:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '10', doctor_id: '10', working_days: ['monday', 'wednesday'], start_time: '10:00', end_time: '13:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '11', doctor_id: '11', working_days: ['saturday', 'tuesday'], start_time: '11:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '12', doctor_id: '12', working_days: ['wednesday', 'thursday'], start_time: '10:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '13', doctor_id: '13', working_days: ['wednesday'], start_time: '10:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: '14', doctor_id: '14', working_days: ['sunday', 'tuesday'], start_time: '10:00', end_time: '14:00', slot_duration: 30, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
];

export const mockDoctorVacations = [];

export const mockStaff = [
  { id: '1', name: 'د. محمد موسي', position: 'رئيس مجلس الاداره', description: 'استاذ جراحة العظام والعمود الفقري والمناظير بكلية الطب جامعة الفيوم', image_url: '/../public/images/moussa.jpeg', facebook: null, linkedin: null, twitter: null, instagram: null, sort_order: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'د. احمد والي', position: 'مدير طبي  ', description: 'استشاري جراحة العظام والعمود الفقري', image_url: '/../public/images/waly.jpeg', facebook: null, linkedin: null, twitter: null, instagram: null, sort_order: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'د. عصام علي', position: 'مدير عام مستشفي ', description: 'استاذ أمراض الجهاز الهضمي والكبد والمناظير بكلية طب الفيوم', image_url: '/../public/images/essam.jpeg', facebook: null, linkedin: null, twitter: null, instagram: null, sort_order: 3, created_at: '2024-01-01T00:00:00Z' },
];

export const mockEquipment = [
  { id: '1', name: 'جهاز الرنين المغناطيسي', description: 'أحدث جهاز رنين مغناطيسي 3 تسلا', category: 'radiology', image_url: null, sort_order: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'جهاز الأشعة المقطعية', description: 'ماسح ضوئي 256 شريحة', category: 'radiology', image_url: null, sort_order: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'جهاز التنفس الصناعي', description: 'أحدث أجهزة التنفس الصناعي', category: 'icu', image_url: null, sort_order: 3, created_at: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'جهاز غسيل الكلى', description: 'أجهزة غسيل كلى متطورة', category: 'icu', image_url: null, sort_order: 4, created_at: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'جهاز تحليل الدم', description: 'محلل دم آلي متكامل', category: 'laboratory', image_url: null, sort_order: 5, created_at: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'جهاز المنظار الجراحي', description: 'منظار جراحي عالي الدقة', category: 'operating', image_url: null, sort_order: 6, created_at: '2024-01-01T00:00:00Z' },
  { id: '7', name: 'جهاز الإنعاش القلبي', description: 'جهاز إنعاش قلبي رئوي آلي', category: 'emergency', image_url: null, sort_order: 7, created_at: '2024-01-01T00:00:00Z' },
  { id: '8', name: 'جهاز تخطيط القلب', description: 'جهاز تخطيط قلب 12 قناة', category: 'emergency', image_url: null, sort_order: 8, created_at: '2024-01-01T00:00:00Z' },
];

export const mockPartners = [
  { id: '1', name: 'شركة الدواء', logo_url: null, sort_order: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'مختبرات البرج', logo_url: null, sort_order: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'مجموعة الرعاية', logo_url: null, sort_order: 3, created_at: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'تقنيات ميديكال', logo_url: null, sort_order: 4, created_at: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'شركة التأمين الصحي', logo_url: null, sort_order: 5, created_at: '2024-01-01T00:00:00Z' },
];

export const mockStatistics = [
  { id: '1', label: 'أطباء', value: 60, icon: 'user-md', sort_order: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', label: 'سرير', value: 44, icon: 'bed', sort_order: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: '3', label: 'غرفة ', value: 33, icon: 'building', sort_order: 3, created_at: '2024-01-01T00:00:00Z' },
  { id: '6', label: 'قسم طبي', value: 12, icon: 'building', sort_order: 6, created_at: '2024-01-01T00:00:00Z' },
];

export const mockTestimonials = [
  { id: '1', patient_name: 'أحمد محمد', rating: 5, text: 'مستشفى رائع بكل المقاييس. الطاقم الطبي محترف جداً والتعامل راقي.', image_url: null, sort_order: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', patient_name: 'فاطمة علي', rating: 5, text: 'شكراً لكل فريق العمل على الرعاية الممتازة خلال فترة علاجي.', image_url: null, sort_order: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: '3', patient_name: 'خالد العتيبي', rating: 4, text: 'من أفضل المستشفيات في الفيوم. الخدمة ممتازة والمواعيد دقيقة.', image_url: null, sort_order: 3, created_at: '2024-01-01T00:00:00Z' },
];

export const mockSiteContent = {
  about: {
    title: 'من نحن',
    description: 'مستشفى رواد الطب التخصصي هو صرح طبي رائد يقدم خدمات صحية متكاملة بأعلى المعايير العالمية.',
    vision: 'أن نكون المستشفى الرائد في تقديم الرعاية الصحية المتكاملة على المستوى الإقليمي.',
    mission: 'تقديم خدمات طبية متميزة بأحدث التقنيات وأمهر الكوادر الطبية مع الالتزام بأعلى معايير الجودة.',
  },
  patient_rights: {
    items: [
      { title: 'الخصوصية', description: 'الحفاظ التام على خصوصية المريض', icon: 'shield' },
      { title: 'الاحترام', description: 'معاملة كل مريض باحترام وتقدير', icon: 'heart' },
      { title: 'جودة الرعاية', description: 'رعاية صحية بأعلى المعايير', icon: 'award' },
      { title: 'سلامة المريض', description: 'بيئة آمنة خالية من الأخطار', icon: 'shield-check' },
      { title: 'السرية الطبية', description: 'حماية المعلومات الطبية', icon: 'lock' },
      { title: 'حق المعرفة', description: 'الإطلاع على التشخيص والعلاج', icon: 'info' },
    ],
  },
  why_choose: {
    items: [
      { title: 'أطباء ذوو خبرة', description: 'نخبة من أمهر الأطباء', icon: 'user-md' },
      { title: 'أحدث الأجهزة الطبية', description: 'تقنيات طبية متطورة', icon: 'cpu' },
      { title: 'طوارئ 24/7', description: 'خدمات طوارئ متواصلة', icon: 'clock' },
      { title: 'العناية المركزة ICU', description: 'وحدة عناية مركزة مجهزة', icon: 'activity' },
      { title: 'خدمة سريعة', description: 'سرعة في الإجراءات', icon: 'zap' },
      { title: 'تشخيص دقيق', description: 'تشخيص بأحدث التقنيات', icon: 'target' },
    ],
  },
  contact: {
    address: ' الفيوم ',
    phone: '+',
    whatsapp: '+20102345678',
    email: 'info@road-hospital.sa',
    hours: 'طوارئ 24 ساعة | العيادات: 8 صباحاً - 10 مساءً',
    map_url: '',
  },
};

export let mockAppointments = [
  { id: '1', full_name: 'أحمد محمد', phone: '0555123456', email: 'ahmed@email.com', age: '35', gender: 'male', department: 'الباطنة', doctor: 'د. أحمد السيد', doctor_id: '1', department_id: '1', patient_id: 'p1', appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], appointment_time: '09:00', notes: null, status: 'pending', created_at: '2024-06-01T08:00:00Z' },
  { id: '2', full_name: 'سارة خالد', phone: '0555987654', email: 'sara@email.com', age: '28', gender: 'female', department: 'القلب', doctor: 'د. سارة محمد', doctor_id: '2', department_id: '2', patient_id: 'p2', appointment_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], appointment_time: '10:30', notes: 'ألم في الصدر', status: 'pending', created_at: '2024-06-01T09:00:00Z' },
  { id: '3', full_name: 'محمد العلي', phone: '0555111222', email: 'mohamed@email.com', age: '45', gender: 'male', department: 'العظام', doctor: 'د. خالد العلي', doctor_id: '3', department_id: '3', patient_id: 'p3', appointment_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], appointment_time: '11:00', notes: 'ألم في الركبة', status: 'confirmed', created_at: '2024-06-01T10:00:00Z' },
  { id: '4', full_name: 'نورة عبدالله', phone: '0555333444', email: null, age: '30', gender: 'female', department: 'الأطفال', doctor: 'د. نورة عبدالله', doctor_id: '4', department_id: '4', patient_id: 'p4', appointment_date: new Date(Date.now() - 86400000).toISOString().split('T')[0], appointment_time: '09:30', notes: null, status: 'completed', created_at: '2024-05-28T11:00:00Z' },
  { id: '5', full_name: 'فيصل الحربي', phone: '0555444555', email: null, age: '50', gender: 'male', department: 'الأعصاب', doctor: 'د. فيصل الحربي', doctor_id: '5', department_id: '5', patient_id: 'p5', appointment_date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], appointment_time: '14:00', notes: 'صداع مزمن', status: 'cancelled', created_at: '2024-05-26T12:00:00Z' },
];

export let mockPatients = [
  { id: 'p1', full_name: 'أحمد محمد', phone: '0555123456', email: 'ahmed@email.com', national_id: '1234567890', gender: 'male', age: '35', created_at: '2024-01-15T00:00:00Z' },
  { id: 'p2', full_name: 'سارة خالد', phone: '0555987654', email: 'sara@email.com', national_id: '0987654321', gender: 'female', age: '28', created_at: '2024-02-10T00:00:00Z' },
  { id: 'p3', full_name: 'محمد العلي', phone: '0555111222', email: 'mohamed@email.com', national_id: '1122334455', gender: 'male', age: '45', created_at: '2024-03-05T00:00:00Z' },
  { id: 'p4', full_name: 'نورة عبدالله', phone: '0555333444', email: null, national_id: null, gender: 'female', age: '30', created_at: '2024-03-20T00:00:00Z' },
  { id: 'p5', full_name: 'فيصل الحربي', phone: '0555444555', email: null, national_id: null, gender: 'male', age: '50', created_at: '2024-04-01T00:00:00Z' },
];

export let mockNotifications = [
  { id: '1', type: 'appointment', title: 'موعد جديد', message: 'حجز جديد: أحمد محمد مع د. أحمد السيد', appointment_id: '1', is_read: false, created_at: new Date().toISOString() },
  { id: '2', type: 'appointment', title: 'موعد جديد', message: 'حجز جديد: سارة خالد مع د. سارة محمد', appointment_id: '2', is_read: false, created_at: new Date().toISOString() },
  { id: '3', type: 'appointment', title: 'تم تأكيد موعد', message: 'تم تأكيد موعد محمد العلي مع د. خالد العلي', appointment_id: '3', is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
];

export let mockContactMessages = [
  { id: '1', name: 'عبدالله الرشيد', email: 'abdullah@email.com', phone: '0555666777', message: 'أود الاستفسار عن مواعيد العيادات الخارجية', created_at: '2024-06-05T08:00:00Z' },
  { id: '2', name: 'هند السبيعي', email: 'hind@email.com', phone: null, message: 'شكراً لكم على الرعاية الممتازة', created_at: '2024-06-04T10:00:00Z' },
];
