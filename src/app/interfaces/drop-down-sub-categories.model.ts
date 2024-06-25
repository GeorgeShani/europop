export interface DDSubCategories {
    mainId: number;
    mainTitle: string;
    subCategoryList: SubCategories[];
}

interface SubCategories {
    id: number;
    name: string;
}