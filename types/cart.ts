export interface CartItem {
  _id: string;
  menu_item_id: string;
  quantity: number;
  name: string;
  price: number;
  image_url: string;
  video_url: string;
  description: string;
}