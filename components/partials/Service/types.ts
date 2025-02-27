type Service = {
 icon: React.ComponentType; 
 title: string;
 description: string;
 linkText: string;
 linkUrl: string;
};

export type ServiceDataType = {
 title: string;
 subtitle: string;
 services: Service[];
 cta: {
   text: string;
   url: string;
 };
};