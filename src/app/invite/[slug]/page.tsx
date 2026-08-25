import { notFound } from 'next/navigation';
import { getInvitation } from '../../../../lib/invitations';
import { HomeView } from '@/sections';
import type { WeddingConfigType } from '@/types/wedding';

type InvitationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { slug } = await params;
  const invitation = await getInvitation(slug);

  if (!invitation) {
    notFound();
  }

  const weddingConfig: WeddingConfigType = {
    date: invitation.wedding_date
      ? new Date(invitation.wedding_date)
      : new Date(),
    bride: {
      name: invitation.bride_name,
      fullName: invitation.bride_name,
      photo:
        invitation.content?.bride_photo ??
        '/assets/images/bride-circle.png',
    },
    groom: {
      name: invitation.groom_name,
      fullName: invitation.groom_name,
      photo:
        invitation.content?.groom_photo ??
        '/assets/images/groom-circle.png',
    },
    venue: {
      ceremony: {
        name: invitation.venue_name ?? '',
        address: invitation.venue_address ?? '',
        time: '',
      },
      reception: {
        name: invitation.venue_name ?? '',
        address: invitation.venue_address ?? '',
        time: '',
      },
    },
  };

  return <HomeView weddingConfig={weddingConfig} />;
}