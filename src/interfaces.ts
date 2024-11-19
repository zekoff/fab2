export interface IAccount {
    id: string;
    avatarId: string;
    familyAdmin: boolean;
    familyId: string;
}

export interface IAvatar {
    id: string;
    name: string;
    image: string;
    level: number;
    coins: number;
    xp: number;
    // unclaimedRewards: IReward[] | null;
    // currentQuests: IQuest[] | null;
    inventory: IItem[] | null;
}

export interface IFamily {
    id: string;
    name: string;
    availableQuests: { quest: IQuest; number: number }[];
    shopInventory: { item: IItem; number: number }[];
    crestImage: string;
    recentAchievements: IAchievement[];
    uiTheme: UiTheme;
    avatars: IAvatar[];
}

export interface IReward {
    id: string;
    xp: number;
    coins: number;
    items: IItem[];
}

export interface IItem {
    id: string;
    name: string;
    description: string | null;
    image: string;
    value: number;
    type: string;
}

export interface IQuest {
    id: string;
    name: string;
    description: string | null;
    xp: number;
    coins: number;
    timestamp: number;
}

export interface IAchievement {
    id: string;
    name: string;
    description: string | null;
    type: AchievementType;
    avatarId: string;
    timestamp: number;
}

export enum AchievementType {
    QUEST = 'QUEST',
    ACCOMPLISHMENT = 'ACCOMPLISHMENT',
    MILESTONE = 'MILESTONE',
    OTHER = 'OTHER'
}

export enum UiTheme {
    FANTASY = 'FANTASY',
}
