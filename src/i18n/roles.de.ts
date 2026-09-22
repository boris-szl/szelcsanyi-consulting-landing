/* ============================================================================
 *  German copy for the open roles.
 *
 *  Job advertisements in Germany and Austria must not discriminate by gender
 *  (AGG §11, GlBG §9), so every role title carries "(m/w/d)" and the body
 *  addresses the reader as "Sie" rather than using a gendered role noun.
 *  Austrian postings additionally have to state the collective-agreement
 *  minimum salary (GlBG §9 Abs. 2) — that figure is not in the English source
 *  and is deliberately not invented here; see `salaryNotice` below.
 * ========================================================================== */

export interface RoleDe {
  title: string
  discipline: string
  location: string
  type: string
  client: string
  status: string
  summary: string
  about: string[]
  note?: string
  responsibilities: string[]
  mustHave: string[]
  niceToHave: string[]
  offer: string[]
}

/*
  Shown on every German role page. Austrian law requires the minimum salary
  per the applicable collective agreement to appear in the advertisement; the
  English source does not carry one, so the page states that it is provided on
  request rather than inventing a number.
*/
export const salaryNotice =
  'Das Mindestentgelt nach dem anwendbaren Kollektivvertrag sowie die Bereitschaft zur Überzahlung entsprechend Qualifikation und Erfahrung teilen wir Ihnen auf Anfrage mit.'

export const rolesDe: Record<string, RoleDe> = {
  'ot-ics-architect': {
    title: 'OT-/ICS-Architekt (m/w/d)',
    discipline: 'Industrie- und KRITIS-Sicherheit',
    location: 'Europa · hybrid + Reisetätigkeit',
    type: 'Festanstellung · Vollzeit',
    client: 'Auftraggeber aus dem KRITIS-Bereich (vertraulich)',
    status: 'Offen',
    summary:
      'Gestalten und sichern Sie die OT-Seite großer Infrastrukturprogramme — Tunnel, Umspannwerke, Flughäfen, Häfen, Bahn und Prozessanlagen — und verantworten Sie die Schnittstelle zur Unternehmens-IT.',
    about: [
      'Tunnel, Umspannwerke, Flughäfen, Häfen, Bahnstrecken und Prozessanlagen laufen auf Betriebstechnik — und diese Technik ist zunehmend vernetzt, zunehmend reguliert und zunehmend ein Ziel.',
      'Sie machen das sicher. Sie gestalten und schützen die OT-Seite unserer Infrastrukturprogramme und verantworten gemeinsam mit der IT-Infrastrukturarchitektur die Schnittstelle zur Unternehmens-IT. Wenn Sie aus Automatisierung, Elektrotechnik oder Anlagensteuerung kommen und sich in Richtung Netzwerk und Sicherheit entwickelt haben, ist diese Position für Sie geschrieben.',
    ],
    responsibilities: [
      'OT- und Industrienetzarchitekturen in laufenden Infrastrukturprojekten entwerfen und absichern',
      'Das IT/OT-Segmentierungsmodell (Zonen und Conduits) gemeinsam mit der IT-Architektur definieren',
      'SCADA-, DCS- und PLC-Umgebungen in überwachbare, verteidigungsfähige Netzentwürfe integrieren',
      'Smart-Road-, Tunnelleit-, Verkehrsmanagement- und intelligente Verkehrssysteme unterstützen',
      'Flughafen-Betriebssysteme, Hafenlogistik und Energienetz-Infrastruktur begleiten',
      'Die Einhaltung der IEC 62443 vorantreiben und zur NIS2-Bereitschaft beitragen',
      'OT-Monitoring, Asset-Transparenz sowie Patch- und Schwachstellenkonzepte spezifizieren',
      'Als technisches Gegenüber für Automatisierungslieferanten, EPC-Auftragnehmer und Anlagenbetreiber auftreten',
    ],
    mustHave: [
      'Mindestens 7 Jahre in industrieller Automatisierung, Leittechnik oder OT-Sicherheit in Großprojekten',
      'Praktisches Verständnis von SCADA-, DCS- und PLC-Umgebungen im Betrieb, nicht nur auf dem Papier',
      'Industrielle Netzwerke: Industrial Ethernet sowie OPC-UA, Modbus, Profinet oder IEC 61850',
      'Solide Netzwerkgrundlagen: Segmentierung, VLANs, Routing und Firewalling im industriellen Umfeld',
      'Fundierte Kenntnis der IEC 62443 und des Zonen-und-Conduits-Modells',
      'Bereitschaft zum Einsatz vor Ort — in Umspannwerken, Anlagenräumen und Leitzentralen',
      'Abschluss in Elektrotechnik, Automatisierung, Informatik oder gleichwertige Berufserfahrung',
      'Verhandlungssicheres Englisch; Deutsch von Vorteil',
    ],
    niceToHave: [
      'Branchenerfahrung in Energie, Bahn, Tunnelbau, Luftfahrt, Häfen, Öl und Gas oder Prozessindustrie',
      'Projekterfahrung mit digitalen Umspannwerken und IEC 61850',
      'OT-Plattformen: Siemens TIA Portal, Schneider EcoStruxure, AVEVA, Ignition, Wonderware',
      'OT-fähiges Monitoring, angebunden an ein SIEM (Microsoft Sentinel, Splunk, QRadar)',
      'Hintergrund in funktionaler Sicherheit',
      'Zertifizierungen wie ISA/IEC 62443 Expert, GICSP, GRID, TÜV Functional Safety, IEC 61850 Specialist oder CISSP',
      'Vertrautheit mit EPC- oder PPP-Projektstrukturen',
    ],
    offer: [
      'Echte Verantwortung für OT-Sicherheit in KRITIS-Programmen',
      'Zertifizierungsbudget für ISA/IEC 62443, GICSP und verwandte Programme',
      'Flexible Arbeitszeiten und ein Reisepaket',
    ],
  },

  'it-infrastructure-cloud-architect': {
    title: 'Senior IT-Infrastruktur- & Cloud-Architekt (m/w/d)',
    discipline: 'KRITIS-Projekte',
    location: 'Europa · hybrid',
    type: 'Festanstellung · Vollzeit',
    client: 'Auftraggeber aus dem KRITIS-Bereich (vertraulich)',
    status: 'Offen',
    summary:
      'Verantworten Sie das IT-Rückgrat großer Infrastrukturprogramme — Netzwerke, Rechenzentren, Cloud und die Sicherheitsarchitektur, die das Ganze zusammenhält.',
    about: [
      'Wir liefern das IT-Rückgrat hinter großen Infrastrukturprogrammen — Flughäfen, Autobahnen und Tunnel, Häfen, Bahn, Energienetze und Industrieanlagen.',
      'Sie verantworten die Unternehmensseite: Netzwerke, Rechenzentren, Cloud und Sicherheitsarchitektur. Industrielle Leitsysteme betreut eine eigene OT-Fachkraft — Sie arbeiten an der Schnittstelle zusammen, müssen diese Rolle aber nicht selbst ausfüllen.',
    ],
    responsibilities: [
      'Unternehmensnetzwerke architektonisch verantworten: WAN, SD-WAN, MPLS, Campus- und Rechenzentrums-Fabrics',
      'Große Rechenzentrums- und Virtualisierungsumgebungen entwerfen und betreiben',
      'Die Hybrid-Cloud-Strategie definieren und Migrationen nach Microsoft Azure leiten',
      'Azure Landing Zones, Infrastructure as Code und Platform-Engineering-Praktiken aufbauen',
      'Hochverfügbarkeits- und Notfallkonzepte für Systeme ohne vertretbare Ausfallzeit entwerfen',
      'Zero-Trust-Architektur entwickeln und die SIEM-/SOC-Einführung begleiten',
      'Die Einhaltung von NIS2, ISO 27001 und DSGVO vorantreiben',
      'Die IT-Seite des IT/OT-Segmentierungsmodells mit der OT-Architektur abstimmen',
    ],
    mustHave: [
      '8 bis 15 Jahre in Unternehmensinfrastruktur, davon mehrere in einer Architekturrolle in Großprojekten',
      'Tiefe Routing- und Switching-Kenntnisse: BGP, OSPF, VXLAN/EVPN, MPLS, SD-WAN, Segmentierung',
      'Praktische Erfahrung mit mindestens zwei der folgenden: Cisco, Juniper, Fortinet, Palo Alto',
      'Fundierte Azure-Architektur: Networking, Azure Firewall, Virtual WAN, Sicherheitsdienste',
      'Rechenzentrum und Virtualisierung: VMware oder Hyper-V, dazu Backup- und Storage-Konzepte',
      'Grundlagen der Infrastruktursicherheit: IAM, PKI, Segmentierung, Härtung',
      'Abschluss in Informatik, Wirtschaftsinformatik oder Ingenieurwesen, oder gleichwertige Berufserfahrung',
      'Verhandlungssicheres Englisch; Deutsch von Vorteil',
    ],
    niceToHave: [
      'Regulierte Branchen oder KRITIS (Verkehr, Energie, Luftfahrt, Industrie)',
      'Microsoft-Tiefe: Windows Server, Active Directory, Entra ID, M365, Intune, Defender',
      'Nutanix, Veeam, NetApp / Dell EMC / Pure Storage',
      'AKS oder andere Container-Plattformen; Berührung mit AWS oder GCP',
      'IaC und Automatisierung: Terraform, Ansible, GitHub/GitLab, Jenkins',
      'Monitoring: Dynatrace, PRTG, SolarWinds, Zabbix',
      'Azure Solutions Architect Expert, CCNP/CCIE Enterprise, VCP-DCV oder CISSP',
      'Vertrautheit mit EPC- oder PPP-Projektstrukturen',
    ],
    offer: [
      'Architekturverantwortung in laufenden, sichtbaren Infrastrukturprogrammen',
      'Budget für Zertifizierungen und Weiterbildung',
      'Flexible Arbeitszeiten, Altersvorsorge und Unterstützung beim Umzug',
    ],
  },

  'senior-infrastructure-architect-it-ot': {
    title: 'Senior Infrastrukturarchitekt IT/OT (m/w/d)',
    discipline: 'Kritische Infrastruktur',
    location: 'Europa · hybrid + Reisetätigkeit',
    type: 'Festanstellung · Vollzeit',
    client: 'Auftraggeber aus dem KRITIS-Bereich (vertraulich)',
    status: 'Offen',
    summary:
      'Leitende Architekturrolle für die IT- und OT-Infrastruktur großer KRITIS-Programme — Unternehmensnetzwerk und Cloud auf der einen Seite, sichere OT-Anbindung auf der anderen.',
    about: [
      'Wir planen, bauen und betreiben die IT- und OT-Infrastruktur hinter großen KRITIS-Programmen — Autobahnen und Tunnel, Flughäfen, Häfen, Bahn, Energieübertragung und Industrieanlagen.',
      'Sie übernehmen die leitende Architekturrolle für diese Umgebungen: Netzwerk und Cloud auf Unternehmensniveau auf der einen Seite, sichere Anbindung der Betriebstechnik auf der anderen.',
    ],
    note:
      'Das ist eine breit angelegte Position — wir suchen niemanden, der jeden Punkt erfüllt. Wir suchen eine starke Architektin oder einen starken Architekten mit fundierter Erfahrung in Unternehmensinfrastruktur und Sicherheit sowie einem belastbaren praktischen Verständnis von OT. Den Rest bauen wir um Sie herum auf.',
    responsibilities: [
      'Netzwerk- und Rechenzentrumsinfrastruktur auf Unternehmensniveau für Großprojekte entwerfen',
      'Die Hybrid-Cloud-Strategie definieren und Azure-Migrationen leiten (Landing Zones, IaC, Platform Engineering)',
      'Hochverfügbarkeits- und Notfallkonzepte für Systeme entwickeln, die nicht ausfallen dürfen',
      'Sichere IT/OT-Segmentierung und die Anbindung an SCADA und industrielle Leitsysteme entwerfen',
      'Zero-Trust-Architekturen entwickeln und die SOC-/SIEM-Einführung begleiten',
      'Die Einhaltung von NIS2, ISO 27001 und IEC 62443 sicherstellen',
      'Als technisches Gegenüber für EPC-Auftragnehmer, Integratoren und Ansprechpartner beim Kunden auftreten',
    ],
    mustHave: [
      'Mindestens 10 Jahre in großen Infrastrukturprojekten, mit nachweisbarer Erfahrung als leitende Architektur',
      'Tiefe praktische Netzwerkkenntnisse: BGP, OSPF, VXLAN/EVPN, MPLS, SD-WAN — auf Cisco, Juniper, Fortinet oder Palo Alto',
      'Fundierte Microsoft-Azure-Architektur (Networking, Firewall, Virtual WAN, Sicherheit)',
      'Infrastruktursicherheit: IAM, PKI, Schwachstellenmanagement, SIEM-/EDR-Konzepte',
      'Belastbares Verständnis von OT — Sie haben eine IT/OT-Schnittstelle in der Praxis entworfen oder abgesichert',
      'Abschluss in Informatik, Wirtschaftsinformatik oder Ingenieurwesen, oder gleichwertige Berufserfahrung',
      'Verhandlungssicheres Englisch; Deutsch von Vorteil',
      'Sehr gute Kommunikation mit Entwicklung, Auftragnehmern und Kunden gleichermaßen',
    ],
    niceToHave: [
      'Branchenerfahrung in Verkehr, Energie, Luftfahrt, Häfen oder Schwerindustrie',
      'Kenntnis von OT-Protokollen: OPC-UA, Modbus, Profinet, IEC 61850, digitale Umspannwerke',
      'Virtualisierung und Storage: VMware, Hyper-V, Nutanix, Veeam, NetApp / Dell EMC / Pure',
      'Microsoft-Plattform: Windows Server, Active Directory, Entra ID, Intune, Defender',
      'DevOps-Werkzeuge: Terraform, Ansible, GitHub/GitLab, Jenkins',
      'Zertifizierungen wie CISSP, Azure Solutions Architect Expert, CCNP/CCIE, ISA/IEC 62443, GICSP — ein oder zwei davon sind ein starkes Signal',
      'Erfahrung mit EPC- oder PPP-Liefermodellen',
    ],
    offer: [
      'Verantwortung für die Architektur in laufenden Infrastrukturprogrammen',
      'Budget für Zertifizierungen und Weiterbildung, einschließlich OT-/ICS-Sicherheit',
      'Flexible Arbeitszeiten, Reiseregelungen, Altersvorsorge und Unterstützung beim Umzug',
    ],
  },
}
