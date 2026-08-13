/*
  Open roles Boris is recruiting for. Add / edit postings here.
  Applications route to the site email; clients are shown as confidential.
*/

export interface Role {
  slug: string
  ref: string
  title: string
  discipline: string
  location: string
  type: string
  client: string
  status: 'Open'
  summary: string
  about: string[]
  note?: string
  responsibilities: string[]
  mustHave: string[]
  niceToHave: string[]
  offer: string[]
}

export const roles: Role[] = [
  {
    slug: 'ot-ics-architect',
    ref: 'R-01',
    title: 'OT / ICS Architect',
    discipline: 'Industrial & Critical-Infrastructure Security',
    location: 'Europe · Hybrid + site travel',
    type: 'Permanent · full-time',
    client: 'Critical-infrastructure client (confidential)',
    status: 'Open',
    summary:
      'Design and secure the OT side of large infrastructure programmes — tunnels, substations, airports, ports, rail and process plants — and own the boundary toward enterprise IT.',
    about: [
      'Tunnels, substations, airports, ports, rail lines and process plants all run on operational technology — and that technology is increasingly connected, increasingly regulated, and increasingly a target.',
      'You are the person who makes that safe. You design and secure the OT side of our infrastructure programmes and own the boundary toward enterprise IT together with the IT infrastructure architect. If you come from automation, electrical engineering or plant control and have moved toward networks and security, this role is written for you.',
    ],
    responsibilities: [
      'Design and secure OT and industrial network architectures across live infrastructure projects',
      'Define the IT/OT segmentation model (zones and conduits) with the IT architect',
      'Integrate SCADA, DCS and PLC environments into monitored, defensible network designs',
      'Support smart-road, tunnel-control, traffic-management and intelligent transport systems',
      'Support airport operational systems, port logistics and energy-grid infrastructure',
      'Drive IEC 62443 compliance and contribute to NIS2 readiness',
      'Specify OT monitoring, asset visibility and patching/vulnerability approaches',
      'Act as technical counterpart to automation vendors, EPC contractors and plant operators',
    ],
    mustHave: [
      '7+ years in industrial automation, control systems or OT security on large projects',
      'Hands-on understanding of SCADA / DCS / PLC environments in operation, not just on paper',
      'Industrial networking: Industrial Ethernet plus OPC-UA, Modbus, Profinet or IEC 61850',
      'Solid network fundamentals: segmentation, VLANs, routing, firewalling in industrial contexts',
      'Working knowledge of IEC 62443 and the zones-and-conduits model',
      'Comfortable on site — substations, plant rooms and control centres',
      'Degree in Electrical Engineering, Automation, Computer Science or equivalent experience',
      'Fluent English; German an advantage',
    ],
    niceToHave: [
      'Sector experience in energy, rail, tunnels, aviation, ports, oil & gas or process industry',
      'Digital-substation and IEC 61850 project experience',
      'OT platforms: Siemens TIA Portal, Schneider EcoStruxure, AVEVA, Ignition, Wonderware',
      'OT-aware monitoring integrated into a SIEM (Microsoft Sentinel, Splunk, QRadar)',
      'Functional-safety background',
      'ISA/IEC 62443 Expert, GICSP, GRID, TÜV Functional Safety, IEC 61850 Specialist or CISSP',
      'Familiarity with EPC or PPP project structures',
    ],
    offer: [
      'Genuine ownership of OT security across critical-infrastructure programmes',
      'Certification budget covering ISA/IEC 62443, GICSP and related tracks',
      'Flexible working and a travel package',
    ],
  },
  {
    slug: 'it-infrastructure-cloud-architect',
    ref: 'R-02',
    title: 'Senior IT Infrastructure & Cloud Architect',
    discipline: 'Critical-Infrastructure Projects',
    location: 'Europe · Hybrid',
    type: 'Permanent · full-time',
    client: 'Critical-infrastructure client (confidential)',
    status: 'Open',
    summary:
      'Own the enterprise IT backbone behind large infrastructure programmes — networks, data centres, cloud, and the security architecture that holds them together.',
    about: [
      'We deliver the IT backbone behind large infrastructure programmes — airports, motorways and tunnels, ports, rail, energy grids and industrial sites.',
      'You own the enterprise side: networks, data centres, cloud and security architecture. Industrial control systems are covered by a dedicated OT specialist — you work with them at the boundary, you do not have to be them.',
    ],
    responsibilities: [
      'Architect enterprise network infrastructure: WAN, SD-WAN, MPLS, campus and data-centre fabrics',
      'Design and run large-scale data-centre and virtualisation environments',
      'Define hybrid-cloud strategy and lead Microsoft Azure migrations',
      'Build Azure landing zones, Infrastructure as Code and platform-engineering practices',
      'Design high-availability and disaster recovery for systems with no acceptable downtime',
      'Develop Zero Trust architecture and support SIEM/SOC implementation',
      'Drive compliance with NIS2, ISO 27001 and GDPR',
      'Define the IT side of the IT/OT segmentation model with the OT architect',
    ],
    mustHave: [
      '8–15 years in enterprise infrastructure, several in an architect role on large projects',
      'Deep routing/switching: BGP, OSPF, VXLAN/EVPN, MPLS, SD-WAN, segmentation',
      'Hands-on with at least two of Cisco, Juniper, Fortinet, Palo Alto',
      'Strong Azure architecture: networking, Azure Firewall, Virtual WAN, security services',
      'Data-centre and virtualisation: VMware or Hyper-V, plus backup and storage concepts',
      'Infrastructure security fundamentals: IAM, PKI, segmentation, hardening',
      'Degree in Computer Science, Information Systems or Engineering, or equivalent experience',
      'Fluent English; German an advantage',
    ],
    niceToHave: [
      'Regulated or critical-infrastructure sectors (transport, energy, aviation, industry)',
      'Microsoft depth: Windows Server, Active Directory, Entra ID, M365, Intune, Defender',
      'Nutanix, Veeam, NetApp / Dell EMC / Pure Storage',
      'AKS or container platforms; AWS or GCP exposure',
      'IaC and automation: Terraform, Ansible, GitHub/GitLab, Jenkins',
      'Monitoring: Dynatrace, PRTG, SolarWinds, Zabbix',
      'Azure Solutions Architect Expert, CCNP/CCIE Enterprise, VCP-DCV or CISSP',
      'Familiarity with EPC or PPP project structures',
    ],
    offer: [
      'Architecture ownership across live, visible infrastructure programmes',
      'Certification and training budget',
      'Flexible working, pension and relocation support',
    ],
  },
  {
    slug: 'senior-infrastructure-architect-it-ot',
    ref: 'R-03',
    title: 'Senior Infrastructure Architect (IT/OT)',
    discipline: 'Critical Infrastructure',
    location: 'Europe · Hybrid + travel',
    type: 'Permanent · full-time',
    client: 'Critical-infrastructure client (confidential)',
    status: 'Open',
    summary:
      'Lead architect for the IT and OT infrastructure behind large critical-infrastructure programmes — enterprise network and cloud on one side, secure OT integration on the other.',
    about: [
      'We design, build and operate the IT and OT infrastructure behind large critical-infrastructure programmes — highways and tunnels, airports, ports, rail, energy transmission and industrial plants.',
      'You will be the lead architect for these environments: enterprise-grade network and cloud on one side, secure integration with operational technology on the other.',
    ],
    note:
      'This is a broad role — we are not looking for someone who ticks every box. We want a strong architect with deep enterprise-infrastructure and security expertise and a genuine working understanding of OT. The rest we build around you.',
    responsibilities: [
      'Design enterprise-grade network and data-centre infrastructure for large projects',
      'Define hybrid-cloud strategy and lead Azure migrations (landing zones, IaC, platform engineering)',
      'Build high-availability and disaster-recovery concepts for systems that cannot go down',
      'Design secure IT/OT segmentation and integration toward SCADA and industrial control systems',
      'Develop Zero Trust architectures and support SOC/SIEM implementation',
      'Ensure compliance with NIS2, ISO 27001 and IEC 62443',
      'Act as technical counterpart to EPC contractors, integrators and client stakeholders',
    ],
    mustHave: [
      '10+ years in large-scale infrastructure projects, with a track record as lead or principal architect',
      'Deep hands-on networking: BGP, OSPF, VXLAN/EVPN, MPLS, SD-WAN — on Cisco, Juniper, Fortinet or Palo Alto',
      'Strong Microsoft Azure architecture (networking, firewall, virtual WAN, security)',
      'Infrastructure security: IAM, PKI, vulnerability management, SIEM/EDR concepts',
      'A working understanding of OT — you have designed or secured an IT/OT boundary in practice',
      'Degree in Computer Science, Information Systems or Engineering, or equivalent experience',
      'Fluent English; German an advantage',
      'Excellent stakeholder communication across engineers, contractors and clients',
    ],
    niceToHave: [
      'Sector experience in transport, energy, aviation, ports or heavy industry',
      'OT protocol knowledge: OPC-UA, Modbus, Profinet, IEC 61850, digital substations',
      'Virtualisation and storage: VMware, Hyper-V, Nutanix, Veeam, NetApp / Dell EMC / Pure',
      'Microsoft platform: Windows Server, Active Directory, Entra ID, Intune, Defender',
      'DevOps tooling: Terraform, Ansible, GitHub/GitLab, Jenkins',
      'Certifications such as CISSP, Azure Solutions Architect Expert, CCNP/CCIE, ISA/IEC 62443, GICSP — any one or two is a strong signal',
      'Experience in EPC or PPP delivery models',
    ],
    offer: [
      'Ownership of the architecture across live infrastructure programmes',
      'Certification and training budget, including OT/ICS security tracks',
      'Flexible working, travel arrangements, pension and relocation',
    ],
  },
]

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug)
}
