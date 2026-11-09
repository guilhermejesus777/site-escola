/**
 * Client ID público do Google (não é segredo).
 *
 * Pode ser sobrescrito pela variável NEXT_PUBLIC_GOOGLE_CLIENT_ID no
 * `.env.local` ou no Render. O valor padrão abaixo já aponta para o
 * aplicativo "Agenda Escolar CEPK" e funciona nas origens autorizadas
 * (localhost e o site no Render).
 */
export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
  "841755445744-qr9hu5m1squ2ah3061ol5q01le9uq9ge.apps.googleusercontent.com";
