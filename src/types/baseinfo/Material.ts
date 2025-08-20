export enum BindMethod {
    IRON = "금구",
    HOLDER = "홀더",
    ACTATE = "아스테지",
    TWIN = "TWIN",
    BIG_PAPER = "대지",
    BOX = "Box",
    SACK = "봉투",
    HALF_MOON = "반달고리",
    VINYL = "비닐",
}

export interface Material {
  id?: number;
  bindMethod: BindMethod; // 분류
  standard1: string; // 규격1
  standard2: string; // 규격2
  contents: string; // 내역
  color: string; // 색상
  createdAt?: string; // yyyy-mm-dd
}