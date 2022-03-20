export default function serverName() {
  return typeof window === 'undefined' ? 'http://localhost:3000' : 'https://your_deployment.server.com';
}
