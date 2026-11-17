import { Currency, Locale, CartItem, OrderCustomerInfo, PaymentMethodType } from './index';

export type OrderStatus = 
  | 'pending_verification' 
  | 'payment_verified' 
  | 'shipping_started' 
  | 'delivered' 
  | 'cancelled';

export interface AdminOrder {
  id: string;
  orderReference: string;
  status: OrderStatus;
  customer: OrderCustomerInfo;
  items: CartItem[];
  paymentMethod: PaymentMethodType;
  paymentProofUrl?: string;
  paymentProofName?: string;
  giftCardCode?: string;
  subtotal: number;
  shipping: number;
  discount: number;
  promoCode?: string;
  total: number;
  currency: Currency;
  locale: Locale;
  createdAt: string;
  updatedAt: string;
  paymentVerifiedAt?: string;
  paymentVerifiedBy?: string;
  shippingStartedAt?: string;
  shippingCarrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  deliveredAt?: string;
  adminNotes?: string;
}

export type AuditAction = 
  | 'ORDER_CREATED'
  | 'VERIFY_PAYMENT'
  | 'START_SHIPPING'
  | 'MARK_DELIVERED'
  | 'CANCEL_ORDER'
  | 'UPDATE_ORDER_NOTES'
  | 'UPDATE_PRODUCT'
  | 'CREATE_PRODUCT'
  | 'DELETE_PRODUCT'
  | 'TOGGLE_AVAILABILITY';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: AuditAction;
  targetType: 'order' | 'product';
  targetId: string;
  targetReference: string;
  details: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'shipping' | 'stock' | 'system';
  read: boolean;
  createdAt: string;
  orderReference?: string;
  productId?: string;
}
