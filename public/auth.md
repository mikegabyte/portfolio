# Authentication

`https://mikegabyte.com` is a **static personal portfolio**. It serves only public
HTML, assets, and machine-readable discovery files. There is nothing to authenticate
against.

- **No protected APIs** — there are no endpoints that require authentication.
- **No agent registration** — there is no registration endpoint; agents need no
  credentials to read any content.
- **No authorization server** — this origin does not issue OAuth/OIDC tokens, so no
  `oauth-authorization-server`, `openid-configuration`, or `oauth-protected-resource`
  metadata is published. Their absence is intentional and accurate.

All content is publicly accessible. Usage preferences are declared in
[`/robots.txt`](https://mikegabyte.com/robots.txt) via `Content-Signal` directives,
and a site overview for agents is at [`/llms.txt`](https://mikegabyte.com/llms.txt).
