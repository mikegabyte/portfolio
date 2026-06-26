# auth.md — mikegabyte.com

**Audience:** AI agents and automated clients accessing `https://mikegabyte.com`.

`https://mikegabyte.com` is a **static personal portfolio**. It serves only public
HTML, assets, and machine-readable discovery files.

- **Registration / provisioning:** none required. There is no registration endpoint;
  agents do not need to provision an identity to use this site.
- **Supported methods:** anonymous public access only. No authentication is performed.
- **Credentials:** none. Do not send `Authorization` headers, API keys, or tokens —
  they are neither required nor honored.
- **Authorization server:** none. This origin does not issue OAuth/OIDC tokens, so no
  `oauth-authorization-server`, `openid-configuration`, or `oauth-protected-resource`
  metadata is published. Their absence is intentional and accurate.

All content is publicly accessible. Usage preferences are declared in
[`/robots.txt`](https://mikegabyte.com/robots.txt) via `Content-Signal` directives,
and a site overview for agents is at [`/llms.txt`](https://mikegabyte.com/llms.txt).
