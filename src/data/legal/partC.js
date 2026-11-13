export const PART_C_SECTIONS = [
  {
    id: 'customer-acceptance',
    number: 63,
    title: 'Customer Acceptance',
    part: 'C',
    content: [
      {
        type: 'paragraph',
        text: 'The application should require active Customer acknowledgement of the Terms and Privacy Policy before account activation or first Booking where legally appropriate.',
      },
      {
        type: 'paragraph',
        text: 'Recommended checkbox: "I have read and agree to the Stylein Terms of Service and Privacy Policy."',
      },
      {
        type: 'paragraph',
        text: 'The Terms and Privacy Policy should remain accessible from the application.',
      },
    ],
  },
  {
    id: 'booking-acceptance',
    number: 64,
    title: 'Booking Acceptance',
    part: 'C',
    content: [
      {
        type: 'paragraph',
        text: 'Before final payment, the application should display: Service selected, Vehicle, Date, Time, Location, Price, VAT/taxes where applicable, Cancellation policy, and Subscription information where applicable.',
      },
      {
        type: 'paragraph',
        text: 'The Customer should actively confirm the Booking.',
      },
    ],
  },
  {
    id: 'location-permission',
    number: 65,
    title: 'Location Permission',
    part: 'C',
    content: [
      {
        type: 'paragraph',
        text: 'The application should request operating-system location permission separately.',
      },
      {
        type: 'paragraph',
        text: 'Recommended explanation: "Stylein uses your location to identify your service location, dispatch your Technician and provide mobile vehicle Services."',
      },
    ],
  },
  {
    id: 'payment-confirmation',
    number: 66,
    title: 'Payment Confirmation',
    part: 'C',
    content: [
      {
        type: 'paragraph',
        text: 'After successful payment, the application should provide: Booking number, Payment confirmation, Invoice/receipt, Service details, and Customer support contact.',
      },
    ],
  },
  {
    id: 'before-service-vehicle-record',
    number: 67,
    title: 'Before-Service Vehicle Record',
    part: 'C',
    content: [
      {
        type: 'paragraph',
        text: 'The Technician application should allow: Vehicle photographs, Date/time, Booking number, Vehicle registration, Existing damage, Condition notes, and Customer confirmation where appropriate.',
      },
    ],
  },
  {
    id: 'after-service-record',
    number: 68,
    title: 'After-Service Record',
    part: 'C',
    content: [
      {
        type: 'paragraph',
        text: 'The Technician application should record: Service completion, Completion time, Service performed, Photographs, Additional work, Customer acceptance, and Technician notes.',
      },
    ],
  },
  {
    id: 'digital-acceptance',
    number: 69,
    title: 'Digital Acceptance',
    part: 'C',
    content: [
      {
        type: 'paragraph',
        text: 'The Platform may use: Checkboxes, OTP verification, Electronic signatures, Digital acceptance, or other legally permitted methods.',
      },
      {
        type: 'paragraph',
        text: 'These records should be securely stored.',
      },
    ],
  },
  {
    id: 'record-keeping',
    number: 70,
    title: 'Record Keeping',
    part: 'C',
    content: [
      {
        type: 'paragraph',
        text: 'The application should maintain appropriate records concerning: Account creation, Terms acceptance, Privacy Policy acceptance, Booking history, Payments, Cancellations, Refunds, Location information where applicable, Before/after photographs, Technician information, Complaints, Warranty claims, Subscription records, and Customer communications.',
      },
      {
        type: 'paragraph',
        text: 'Access should be restricted according to business need.',
      },
    ],
  },
];
