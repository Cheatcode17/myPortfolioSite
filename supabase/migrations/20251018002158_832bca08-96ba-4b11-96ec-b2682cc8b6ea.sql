-- Create table for page views analytics
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert page views
CREATE POLICY "Anyone can insert page views"
  ON public.page_views
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to view page views for analytics
CREATE POLICY "Anyone can view page views"
  ON public.page_views
  FOR SELECT
  USING (true);

-- Allow anyone to view notifications
CREATE POLICY "Anyone can view notifications"
  ON public.notifications
  FOR SELECT
  USING (true);

-- Allow anyone to update notifications (mark as read)
CREATE POLICY "Anyone can update notifications"
  ON public.notifications
  FOR UPDATE
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON public.page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);