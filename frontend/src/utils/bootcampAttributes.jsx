const getBootcampAttributes = (bootcamp) => [
  {
    label: "Housing",
    value: bootcamp.housing ? "Available" : "Not Available",
    isAvailable: bootcamp.housing,
  },
  {
    label: "Job Assistance",
    value: bootcamp.jobAssistance ? "Available" : "Not Available",
    isAvailable: bootcamp.jobAssistance,
  },
  {
    label: "Job Guarantee",
    value: bootcamp.jobGuarantee ? "Available" : "Not Available",
    isAvailable: bootcamp.jobGuarantee,
  },
  {
    label: "Accepts Gi Bill",
    value: bootcamp.acceptGi ? "Available" : "Not Available",
    isAvailable: bootcamp.acceptGi,
  },
];

export default getBootcampAttributes;
