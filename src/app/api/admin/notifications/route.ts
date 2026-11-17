import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, addNotification } from '@/lib/adminStore';

export async function GET(request: NextRequest) {
  try {
    const notifications = getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    return NextResponse.json({ success: true, unreadCount, notifications });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id } = body;

    if (action === 'mark_all_read') {
      markAllNotificationsAsRead();
      return NextResponse.json({ success: true, message: 'Toutes les notifications sont marquées comme lues' });
    }

    if (action === 'mark_read' && id) {
      markNotificationAsRead(id);
      return NextResponse.json({ success: true, message: 'Notification marquée comme lue' });
    }

    if (action === 'add') {
      const newNotif = addNotification(body.notification);
      return NextResponse.json({ success: true, notification: newNotif }, { status: 201 });
    }

    return NextResponse.json({ success: false, message: 'Action invalide' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
