export interface IfeaturedBrand {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
  isNew: boolean;
  specialOffer?: string;
  isFollowed: boolean;
}
