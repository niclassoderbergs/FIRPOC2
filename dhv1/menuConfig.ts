
export type ViewMode = 'general' | 'welcome' | 'storyline' | 'impactAssessment' | 'dhvWelcome' | 'timeline' | 'deployment' | 'todo' | 'dhvDomain1' | 'dhvDomain2' | 'dhvDomain6' | 'dhvDomain7' | 'dhvDomain9' | 'detail' | 'mps' | 'status' | 'domainLanding' | 'brsOverview' | 'mpsOverview' | 'actorOverview' | 'globalActorOverview' | 'dhvActorOverview' | 'domainOverview' | 'conditions' | 'procedures' | 'renumbering' | 'infoModel' | 'procedureDetail' | 'firPoc' | 'bids_received' | 'bids_activated' | 'verification' | 'settlement_result' | 'brp_settlement' | 're_settlement';

export const overviewMenuItems = [
    { id: 'welcome', label: 'ℹ️ Om FIR', view: 'welcome' as ViewMode },
    { id: 'domainOverview', label: '🌐 Domänöversikt', view: 'domainOverview' as ViewMode },
    { id: 'globalActorOverview', label: '👥 Aktörsmatris', view: 'globalActorOverview' as ViewMode },
    { id: 'infoModel', label: '📘 Informationsmodell', view: 'infoModel' as ViewMode },
    { id: 'procedures', label: '📜 JWG Processer', view: 'procedures' as ViewMode },
    { id: 'firPoc', label: '🖥️ GUI POC', view: 'firPoc' as ViewMode },
];

export const dhvOverviewMenuItems = [
    { id: 'dhvWelcome', label: 'ℹ️ Om DHV', view: 'dhvWelcome' as ViewMode },
    { id: 'dhvActorOverview', label: '👥 Aktörsmatris', view: 'dhvActorOverview' as ViewMode },
];

export const adminMenuItems = [
    { id: 'status', label: '📊 Status Dashboard', view: 'status' as ViewMode },
    { id: 'renumbering', label: '🔢 ID Omnumrering', view: 'renumbering' as ViewMode },
];
