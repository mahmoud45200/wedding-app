import { HomeView } from '@/sections';
import { WEDDING_CONFIG } from '@/constants';

export default function Home() {
  return <HomeView weddingConfig={WEDDING_CONFIG} />;
}
