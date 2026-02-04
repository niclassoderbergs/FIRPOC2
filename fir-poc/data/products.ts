
export const svkProducts: any[] = [
    { 
      id: 'FCR-N', 
      name: 'FCR-N', 
      market: 'Balancing Market (TSO)', 
      operator: 'Svenska kraftnät',
      category: 'Frequency', 
      activation: 'Automatic', 
      description: 'Normal operation reserve for frequency stabilization.' 
    },
    { 
      id: 'FCR-D-UP', 
      name: 'FCR-D Up', 
      market: 'Balancing Market (TSO)', 
      operator: 'Svenska kraftnät',
      category: 'Frequency', 
      activation: 'Automatic', 
      description: 'Disturbance Upwards reserve.' 
    },
    { 
      id: 'FCR-D-DOWN', 
      name: 'FCR-D Down', 
      market: 'Balancing Market (TSO)', 
      operator: 'Svenska kraftnät',
      category: 'Frequency', 
      activation: 'Automatic', 
      description: 'Disturbance Downwards reserve.' 
    },
    { 
      id: 'mFRR', 
      name: 'mFRR', 
      market: 'Balancing Market (TSO)', 
      operator: 'Svenska kraftnät',
      category: 'Energy', 
      activation: 'Manual', 
      description: 'Manual restoration reserve.' 
    },
    { 
      id: 'aFRR', 
      name: 'aFRR', 
      market: 'Balancing Market (TSO)', 
      operator: 'Svenska kraftnät',
      category: 'Energy', 
      activation: 'Automatic', 
      description: 'Automatic restoration reserve.' 
    },
    { 
      id: 'LM-EON-DIR', 
      name: 'Direct Orders', 
      market: 'E.ON Switch', 
      operator: 'E.ON',
      category: 'Energy', 
      activation: 'Manual', 
      description: 'Activation remuneration for flexibility during specific hours of need (D-2 to 3h before delivery).' 
    },
    { 
      id: 'LM-EON-AVA', 
      name: 'Availability Orders', 
      market: 'E.ON Switch', 
      operator: 'E.ON',
      category: 'Capacity', 
      activation: 'Manual', 
      description: 'Remuneration for both availability and activation. Bids submitted 7 to 2 days before delivery.' 
    },
    { 
      id: 'LM-EON-SEA', 
      name: 'Seasonal Availability', 
      market: 'E.ON Switch', 
      operator: 'E.ON',
      category: 'Capacity', 
      activation: 'Scheduled', 
      description: 'Readiness during fixed hours (weekdays 07-11, 16-20) during winter months.' 
    }
];
