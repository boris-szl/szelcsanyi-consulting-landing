<?xml version="1.0" encoding="UTF-8"?>
<!--
  Makes the sitemap readable in a browser.

  Purely presentational: a crawler parses the XML and never fetches this.
  Styles are inlined and fonts are system stacks, because the site's own CSS
  and font files carry build hashes that would go stale here.
-->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <xsl:output method="html" indent="yes" encoding="UTF-8" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <title>Sitemap — szelcsanyi consulting</title>
        <style>
          :root {
            --bg: #101215;
            --surface: #16191d;
            --surface-2: #1c2026;
            --ink: #e2e8f0;
            --muted: #8b95a5;
            --line: #222b35;
            --accent: #2be080;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: var(--bg);
            color: var(--ink);
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          .wrap { max-width: 78rem; margin: 0 auto; padding: 3.5rem 1.25rem 5rem; }
          .mark { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; }
          .mark span { color: var(--accent); }
          h1 {
            font-size: clamp(1.9rem, 4vw, 2.75rem);
            line-height: 1.05;
            letter-spacing: -0.02em;
            margin: 2.25rem 0 0.75rem;
          }
          .lede { color: var(--muted); max-width: 46rem; line-height: 1.65; margin: 0; }
          .label {
            font-family: ui-monospace, SFMono-Regular, "Geist Mono", monospace;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--muted);
          }
          .label b { color: var(--accent); font-weight: 600; }
          .panel {
            margin-top: 2.5rem;
            border: 1px solid var(--line);
            border-radius: 12px;
            background: var(--surface);
            overflow: hidden;
          }
          /* The table scrolls inside the panel so the page never does. */
          .scroll { overflow-x: auto; }
          table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
          th {
            text-align: left;
            padding: 0.9rem 1.15rem;
            border-bottom: 1px solid var(--line);
            background: var(--surface-2);
            font-family: ui-monospace, SFMono-Regular, monospace;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--muted);
            font-weight: 500;
            white-space: nowrap;
          }
          td {
            padding: 0.8rem 1.15rem;
            border-bottom: 1px solid var(--line);
            vertical-align: top;
          }
          tr:last-child td { border-bottom: 0; }
          tr:hover td { background: rgba(43, 224, 128, 0.03); }
          a { color: var(--ink); text-decoration: none; }
          a:hover { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
          .path { word-break: break-word; }
          .origin { color: var(--muted); }
          .meta {
            font-family: ui-monospace, SFMono-Regular, monospace;
            font-size: 0.75rem;
            color: var(--muted);
            white-space: nowrap;
          }
          .tag {
            display: inline-block;
            font-family: ui-monospace, SFMono-Regular, monospace;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: 0.15rem 0.5rem;
            margin-right: 0.3rem;
            color: var(--muted);
          }
          .tag.on { border-color: rgba(43, 224, 128, 0.35); color: var(--accent); }
          footer { margin-top: 2rem; }
          @media (max-width: 40rem) {
            .wrap { padding-top: 2.25rem; }
            td, th { padding: 0.7rem 0.85rem; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="mark">szelcsanyi <span>consulting</span></div>

          <!-- Sitemap index: a list of sitemaps rather than of pages. -->
          <xsl:if test="sm:sitemapindex">
            <h1>Sitemap index</h1>
            <p class="lede">
              This file lists the sitemaps for szelcsanyi.net. Open one to see the pages it
              contains.
            </p>
            <p class="label" style="margin-top:1.5rem">
              <b><xsl:value-of select="count(sm:sitemapindex/sm:sitemap)" /></b>
              <xsl:text> sitemap(s)</xsl:text>
            </p>
            <div class="panel">
              <div class="scroll">
                <table>
                  <tr><th>Sitemap</th><th>Last modified</th></tr>
                  <xsl:for-each select="sm:sitemapindex/sm:sitemap">
                    <tr>
                      <td class="path">
                        <a href="{sm:loc}"><xsl:value-of select="sm:loc" /></a>
                      </td>
                      <td class="meta">
                        <xsl:value-of select="substring(sm:lastmod, 1, 10)" />
                      </td>
                    </tr>
                  </xsl:for-each>
                </table>
              </div>
            </div>
          </xsl:if>

          <!-- URL set: the pages themselves. -->
          <xsl:if test="sm:urlset">
            <h1>Sitemap</h1>
            <p class="lede">
              Every page on szelcsanyi.net, in English and German. Each row shows the languages
              a page is available in — the same hreflang pairs declared in the pages themselves.
            </p>
            <p class="label" style="margin-top:1.5rem">
              <b><xsl:value-of select="count(sm:urlset/sm:url)" /></b>
              <xsl:text> URLs · </xsl:text>
              <b><xsl:value-of select="count(sm:urlset/sm:url[contains(sm:loc, '/de')])" /></b>
              <xsl:text> German</xsl:text>
            </p>
            <div class="panel">
              <div class="scroll">
                <table>
                  <tr>
                    <th>URL</th>
                    <th>Last modified</th>
                    <th>Languages</th>
                    <th>Priority</th>
                  </tr>
                  <xsl:for-each select="sm:urlset/sm:url">
                    <tr>
                      <td class="path">
                        <a href="{sm:loc}">
                          <span class="origin">szelcsanyi.net/</span>
                          <xsl:value-of select="substring-after(substring-after(sm:loc, '//'), '/')" />
                        </a>
                      </td>
                      <td class="meta">
                        <xsl:choose>
                          <xsl:when test="sm:lastmod">
                            <xsl:value-of select="substring(sm:lastmod, 1, 10)" />
                          </xsl:when>
                          <xsl:otherwise>—</xsl:otherwise>
                        </xsl:choose>
                      </td>
                      <td>
                        <xsl:for-each select="xhtml:link[@rel='alternate']">
                          <span class="tag on"><xsl:value-of select="@hreflang" /></span>
                        </xsl:for-each>
                        <xsl:if test="not(xhtml:link[@rel='alternate'])">
                          <span class="tag">—</span>
                        </xsl:if>
                      </td>
                      <td class="meta">
                        <xsl:choose>
                          <xsl:when test="sm:priority">
                            <xsl:value-of select="sm:priority" />
                          </xsl:when>
                          <xsl:otherwise>—</xsl:otherwise>
                        </xsl:choose>
                      </td>
                    </tr>
                  </xsl:for-each>
                </table>
              </div>
            </div>
          </xsl:if>

          <footer class="label">
            <a href="/">Back to szelcsanyi.net</a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
