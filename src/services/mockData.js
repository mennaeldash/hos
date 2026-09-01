/*
  Mock Data مؤقت للأجزاء التي لم يتم ربطها بالـ Backend بعد.

  تم ربط:
  - Departments ✅
  - Doctors ✅

  ما زال مؤقتًا:
  - Doctor Schedules (أيام عمل الدكتور فقط)
  - Staff
  - Equipment
  - Partners
  - Statistics
  - Testimonials
  - Site Content
  - Appointments
  - Patients
  - Notifications
  - Contact Messages
*/

/* =========================================================
   DOCTOR SCHEDULES

   مؤقتًا لعرض أيام عمل الدكتور في الحجز.

   مهم جدًا:
   doctor_id هنا لازم يطابق ID الدكتور الحقيقي
   الموجود في الـ Backend.
========================================================= */

export const mockDoctorSchedules = [
  {
    id: "1",
    doctor_id: "1",
    working_days: ["sunday"],
  },

  {
    id: "2",
    doctor_id: "2",
    working_days: [
      "saturday",
      "monday",
      "wednesday",
    ],
  },

  {
    id: "3",
    doctor_id: "3",
    working_days: ["sunday"],
  },

  {
    id: "4",
    doctor_id: "4",
    working_days: [
      "saturday",
      "monday",
    ],
  },

  {
    id: "5",
    doctor_id: "5",
    working_days: [
      "sunday",
      "tuesday",
      "thursday",
    ],
  },

  {
    id: "6",
    doctor_id: "6",
    working_days: ["sunday"],
  },

  {
    id: "7",
    doctor_id: "7",
    working_days: ["saturday"],
  },

  {
    id: "8",
    doctor_id: "8",
    working_days: [
      "monday",
      "thursday",
    ],
  },

  {
    id: "9",
    doctor_id: "9",
    working_days: [
      "sunday",
      "tuesday",
    ],
  },

  {
    id: "10",
    doctor_id: "10",
    working_days: [
      "monday",
      "wednesday",
    ],
  },

  {
    id: "11",
    doctor_id: "11",
    working_days: [
      "saturday",
      "tuesday",
    ],
  },

  {
    id: "12",
    doctor_id: "12",
    working_days: [
      "wednesday",
      "thursday",
    ],
  },

  {
    id: "13",
    doctor_id: "13",
    working_days: ["wednesday"],
  },

  {
    id: "14",
    doctor_id: "14",
    working_days: [
      "sunday",
      "tuesday",
    ],
  },
];

/* =========================================================
   STAFF
========================================================= */

export const mockStaff = [
  {
    id: "1",

    name: "د. محمد موسي",

    position: "رئيس مجلس الاداره",

    description:
      "استاذ جراحة العظام والعمود الفقري والمناظير بكلية الطب جامعة الفيوم",

    image_url: "/images/moussa.jpeg",

    facebook: null,
    linkedin: null,
    twitter: null,
    instagram: null,

    sort_order: 1,

    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "2",

    name: "د. احمد والي",

    position: "مدير طبي",

    description:
      "استشاري جراحة العظام والعمود الفقري",

    image_url: "/images/waly.jpeg",

    facebook: null,
    linkedin: null,
    twitter: null,
    instagram: null,

    sort_order: 2,

    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "3",

    name: "د. عصام علي",

    position: "مدير عام مستشفي",

    description:
      "استاذ أمراض الجهاز الهضمي والكبد والمناظير بكلية طب الفيوم",

    image_url: "/images/essam.jpeg",

    facebook: null,
    linkedin: null,
    twitter: null,
    instagram: null,

    sort_order: 3,

    created_at:
      "2024-01-01T00:00:00Z",
  },
];
/* =========================================================
   SERVICES / EQUIPMENT
========================================================= */

export const mockEquipment = [
  {
    id: "1",
    name: "العناية المركزة",
    description:
      "وحدة عناية مركزة مجهزة بأحدث الأجهزة الطبية لمتابعة الحالات الحرجة على مدار 24 ساعة، تحت إشراف فريق طبي وتمريضي متخصص، لتقديم رعاية دقيقة وسريعة وفق أعلى معايير الجودة والأمان.",
    category: "icu",
    image_url: "/public/images/Screenshot (5307).png",
    sort_order: 1,
    created_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "2",
    name: "عناية القلب",
    description:
      "رعاية متخصصة للحالات القلبية الحرجة، مع متابعة دقيقة على مدار الساعة بأحدث الأجهزة الطبية، تحت إشراف فريق طبي وتمريضي متخصص.",
    category: "cardiac-care",
    image_url: "/public/images/Screenshot (5309).png",
    sort_order: 2,
    created_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "3",
    name: "غرف العناية المركزة VIP",
    description:
      "توفر الغرف رعاية طبية متقدمة للحالات الحرجة في بيئة أكثر خصوصية وهدوءًا، مع تجهيزات طبية متكاملة ومتابعة مستمرة من الفريق الطبي، بما يضمن للمريض أعلى مستويات الرعاية والراحة والخصوصية.",
    category: "vip",
    image_url: "/public/images/Screenshot (5310).png",
    sort_order: 3,
    created_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "4",
    name: "الحضانة (حديثي الولادة)",
    description:
      "وحدة متخصصة لرعاية الأطفال حديثي الولادة والمبتسرين، مجهزة بأحدث الأجهزة الطبية وتعمل تحت إشراف فريق طبي وتمريضي متخصص على مدار الساعة، لضمان تقديم أفضل مستويات الرعاية والدعم للأطفال منذ لحظاتهم الأولى.",
    category: "nursery",
    image_url: "/public/images/Screenshot (5311).png",
    sort_order: 4,
    created_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "5",
    name: "قسم الطوارئ",
    description:
      "قسم مجهز بأحدث الأجهزة الطبية ويعمل على مدار 24 ساعة لاستقبال الحالات الطارئة وتقديم الرعاية الطبية العاجلة بكفاءة وسرعة، تحت إشراف فريق طبي متخصص.",
    category: "emergency",
    image_url: "/public/images/Screenshot (5312).png",
    sort_order: 5,
    created_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "6",
    name: "قسم الأشعة",
    description:
      "يوفر قسم الأشعة بالمستشفى خدمات تشخيصية متكاملة تشمل الأشعة العادية، والأشعة السينية (X-Ray)، والأشعة المقطعية (CT Scan)، باستخدام أجهزة وتجهيزات حديثة وبإشراف فريق متخصص، للمساعدة في الوصول إلى تشخيص دقيق وسريع للحالات المختلفة.",
    category: "radiology",
    image_url: "/public/images/Screenshot (5313).png",
    sort_order: 6,
    created_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "7",
    name: "العيادات الخارجية",
    description:
      "عيادات خارجية متخصصة تضم نخبة من الأطباء في مختلف التخصصات، لتقديم خدمات طبية متكاملة وتشخيص دقيق ومتابعة مستمرة للمرضى، في بيئة مريحة وآمنة.",
    category: "clinics",
    image_url: "/public/images/Screenshot (5314).png",
    sort_order: 7,
    created_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "8",
    name: "الصيدلية",
    description:
      "صيدلية متكاملة توفر الأدوية والمستلزمات الطبية اللازمة للمرضى، مع الحرص على توفير خدمة آمنة وسريعة تحت إشراف متخصصين.",
    category: "pharmacy",
    image_url: "/public/images/Screenshot (5315).png",
    sort_order: 8,
    created_at: "2024-01-01T00:00:00Z",
  },
];

/* =========================================================
   PARTNERS
========================================================= */

export const mockPartners = [
  {
    id: "1",
    name: "شركة الدواء",
    logo_url: null,
    sort_order: 1,
    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "2",
    name: "مختبرات البرج",
    logo_url: null,
    sort_order: 2,
    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "3",
    name: "مجموعة الرعاية",
    logo_url: null,
    sort_order: 3,
    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "4",
    name: "تقنيات ميديكال",
    logo_url: null,
    sort_order: 4,
    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "5",
    name: "شركة التأمين الصحي",
    logo_url: null,
    sort_order: 5,
    created_at:
      "2024-01-01T00:00:00Z",
  },
];

/* =========================================================
   STATISTICS
========================================================= */

export const mockStatistics = [
  {
    id: "1",
    label: "أطباء",
    value: 60,
    icon: "user-md",
    sort_order: 1,
    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "2",
    label: "سرير",
    value: 44,
    icon: "bed",
    sort_order: 2,
    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "3",
    label: "غرفة",
    value: 33,
    icon: "building",
    sort_order: 3,
    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "6",
    label: "قسم طبي",
    value: 12,
    icon: "building",
    sort_order: 6,
    created_at:
      "2024-01-01T00:00:00Z",
  },
];

/* =========================================================
   TESTIMONIALS
========================================================= */

export const mockTestimonials = [
  {
    id: "1",

    patient_name: "أحمد محمد",

    rating: 5,

    text:
      "مستشفى رائع بكل المقاييس. الطاقم الطبي محترف جداً والتعامل راقي.",

    image_url: null,

    sort_order: 1,

    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "2",

    patient_name: "فاطمة علي",

    rating: 5,

    text:
      "شكراً لكل فريق العمل على الرعاية الممتازة خلال فترة علاجي.",

    image_url: null,

    sort_order: 2,

    created_at:
      "2024-01-01T00:00:00Z",
  },

  {
    id: "3",

    patient_name: "خالد العتيبي",

    rating: 4,

    text:
      "من أفضل المستشفيات في الفيوم. الخدمة ممتازة والمواعيد دقيقة.",

    image_url: null,

    sort_order: 3,

    created_at:
      "2024-01-01T00:00:00Z",
  },
];

/* =========================================================
   SITE CONTENT
========================================================= */

export const mockSiteContent = {
  about: {
    title: "من نحن",

   description:
  " أمن وسلامة ورضاء العميل. تطوير الأداء ليتناسب مع معايير جودة الرعاية الصحية المعتمدة، وكذلك يحقق احتياجات المرضى وذويهم. رفع كفاءة ومهارات العاملين. إضافة خدمات جديدة حسب متطلبات المجتمع.",
 vision:
  "أن تصبح مستشفى رواد الطب التخصصي الاختيار الأول للمرضى، والرائدة في تقديم خدمات الرعاية الطبية بمستوى منافس للصروح الطبية على مستوى جمهورية مصر العربية، وفق معايير الجودة المصرية والعالمية.",
  mission:
  "تقديم خدمات الرعاية الصحية بأعلى مستوى من الكفاءة الطبية طبقًا لمعايير الجودة وسلامة المرضى، وتشمل أقسام الرعاية العاجلة والجراحات والعيادات الخارجية والرعاية المركزة والحضانات وأحدث الأجهزة الطبية، مع خدمة فندقية متميزة في بيئة آمنة، ومن خلال فريق طبي متميز وفريق إداري متكامل.",

},
patient_rights: {
  items: [
    {
      title: "السلامة والأمان",
      description:
        "حق المريض في الحفاظ على سلامته وأمنه.",
      icon: "shield-check",
    },

    {
      title: "احترام القيم والمعتقدات",
      description:
        "الحق في الحصول على الرعاية التي تحترم قيم ومعتقدات المريض الشخصية.",
      icon: "heart",
    },

    {
      title: "معرفة الحالة والمشاركة في القرار",
      description:
        "الحق في معرفة حالته الصحية والمشاركة في قرارات العلاج أو تغيير الطبيب المعالج.",
      icon: "info",
    },

    {
      title: "العلاج المناسب للألم",
      description:
        "الحق في تلقي العلاج المناسب للألم.",
      icon: "award",
    },

    {
      title: "الشكوى والاقتراح",
      description:
        "الحق في الشكوى والاقتراح دون خوف أو التعرض للاضطهاد.",
      icon: "info",
    },

    {
      title: "الحماية من الإيذاء والإهمال",
      description:
        "الحق في الحماية من الإيذاء والإهمال.",
      icon: "shield",
    },
  ],
},
  contact: {
    address: "الفيوم",

    phone: "+",

    whatsapp:
      "+20102345678",

    email:
      "info@road-hospital.sa",

    hours:
      "طوارئ 24 ساعة | العيادات: 8 صباحاً - 10 مساءً",

    map_url: "",
  },
};

/* =========================================================
   APPOINTMENTS
========================================================= */

export let mockAppointments = [
  {
    id: "1",

    full_name: "أحمد محمد",

    phone: "0555123456",

    email:
      "ahmed@email.com",

    age: "35",

    gender: "male",

    department:
      "الباطنة",

    doctor:
      "د. أحمد السيد",

    doctor_id: "1",

    department_id: "1",

    patient_id: "p1",

    appointment_date:
      new Date(
        Date.now() +
          86400000
      )
        .toISOString()
        .split("T")[0],

    appointment_time:
      "09:00",

    notes: null,

    status: "pending",

    created_at:
      "2024-06-01T08:00:00Z",
  },

  {
    id: "2",

    full_name: "سارة خالد",

    phone: "0555987654",

    email:
      "sara@email.com",

    age: "28",

    gender: "female",

    department:
      "القلب",

    doctor:
      "د. سارة محمد",

    doctor_id: "2",

    department_id: "2",

    patient_id: "p2",

    appointment_date:
      new Date(
        Date.now() +
          86400000 * 2
      )
        .toISOString()
        .split("T")[0],

    appointment_time:
      "10:30",

    notes:
      "ألم في الصدر",

    status: "pending",

    created_at:
      "2024-06-01T09:00:00Z",
  },

  {
    id: "3",

    full_name:
      "محمد العلي",

    phone:
      "0555111222",

    email:
      "mohamed@email.com",

    age: "45",

    gender: "male",

    department:
      "العظام",

    doctor:
      "د. خالد العلي",

    doctor_id: "3",

    department_id: "3",

    patient_id: "p3",

    appointment_date:
      new Date(
        Date.now() +
          86400000 * 3
      )
        .toISOString()
        .split("T")[0],

    appointment_time:
      "11:00",

    notes:
      "ألم في الركبة",

    status:
      "confirmed",

    created_at:
      "2024-06-01T10:00:00Z",
  },

  {
    id: "4",

    full_name:
      "نورة عبدالله",

    phone:
      "0555333444",

    email: null,

    age: "30",

    gender: "female",

    department:
      "الأطفال",

    doctor:
      "د. نورة عبدالله",

    doctor_id: "4",

    department_id: "4",

    patient_id: "p4",

    appointment_date:
      new Date(
        Date.now() -
          86400000
      )
        .toISOString()
        .split("T")[0],

    appointment_time:
      "09:30",

    notes: null,

    status:
      "completed",

    created_at:
      "2024-05-28T11:00:00Z",
  },

  {
    id: "5",

    full_name:
      "فيصل الحربي",

    phone:
      "0555444555",

    email: null,

    age: "50",

    gender: "male",

    department:
      "الأعصاب",

    doctor:
      "د. فيصل الحربي",

    doctor_id: "5",

    department_id: "5",

    patient_id: "p5",

    appointment_date:
      new Date(
        Date.now() -
          86400000 * 2
      )
        .toISOString()
        .split("T")[0],

    appointment_time:
      "14:00",

    notes:
      "صداع مزمن",

    status:
      "cancelled",

    created_at:
      "2024-05-26T12:00:00Z",
  },
];

/* =========================================================
   PATIENTS
========================================================= */

export let mockPatients = [
  {
    id: "p1",

    full_name:
      "أحمد محمد",

    phone:
      "0555123456",

    email:
      "ahmed@email.com",

    national_id:
      "1234567890",

    gender:
      "male",

    age: "35",

    created_at:
      "2024-01-15T00:00:00Z",
  },

  {
    id: "p2",

    full_name:
      "سارة خالد",

    phone:
      "0555987654",

    email:
      "sara@email.com",

    national_id:
      "0987654321",

    gender:
      "female",

    age: "28",

    created_at:
      "2024-02-10T00:00:00Z",
  },

  {
    id: "p3",

    full_name:
      "محمد العلي",

    phone:
      "0555111222",

    email:
      "mohamed@email.com",

    national_id:
      "1122334455",

    gender:
      "male",

    age: "45",

    created_at:
      "2024-03-05T00:00:00Z",
  },

  {
    id: "p4",

    full_name:
      "نورة عبدالله",

    phone:
      "0555333444",

    email: null,

    national_id: null,

    gender:
      "female",

    age: "30",

    created_at:
      "2024-03-20T00:00:00Z",
  },

  {
    id: "p5",

    full_name:
      "فيصل الحربي",

    phone:
      "0555444555",

    email: null,

    national_id: null,

    gender:
      "male",

    age: "50",

    created_at:
      "2024-04-01T00:00:00Z",
  },
];

/* =========================================================
   NOTIFICATIONS
========================================================= */

export let mockNotifications = [
  {
    id: "1",

    type:
      "appointment",

    title:
      "موعد جديد",

    message:
      "حجز جديد: أحمد محمد مع د. أحمد السيد",

    appointment_id:
      "1",

    is_read: false,

    created_at:
      new Date().toISOString(),
  },

  {
    id: "2",

    type:
      "appointment",

    title:
      "موعد جديد",

    message:
      "حجز جديد: سارة خالد مع د. سارة محمد",

    appointment_id:
      "2",

    is_read: false,

    created_at:
      new Date().toISOString(),
  },

  {
    id: "3",

    type:
      "appointment",

    title:
      "تم تأكيد موعد",

    message:
      "تم تأكيد موعد محمد العلي مع د. خالد العلي",

    appointment_id:
      "3",

    is_read: true,

    created_at:
      new Date(
        Date.now() -
          86400000
      ).toISOString(),
  },
];

/* =========================================================
   CONTACT MESSAGES
========================================================= */

export let mockContactMessages = [
  {
    id: "1",

    name:
      "عبدالله الرشيد",

    email:
      "abdullah@email.com",

    phone:
      "0555666777",

    message:
      "أود الاستفسار عن مواعيد العيادات الخارجية",

    created_at:
      "2024-06-05T08:00:00Z",
  },

  {
    id: "2",

    name:
      "هند السبيعي",

    email:
      "hind@email.com",

    phone: null,

    message:
      "شكراً لكم على الرعاية الممتازة",

    created_at:
      "2024-06-04T10:00:00Z",
  },
];