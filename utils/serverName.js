export default function serverName() {
  console.log(typeof window);
  return typeof window === 'undefined' ? 'http://localhost:3000' : 'https://your_deployment.server.com';
}
