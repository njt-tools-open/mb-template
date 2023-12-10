declare interface RemoteInfoModel {
  name: string;
  port: number;
  version: string;
}

declare interface RouteModel {
  name: string;
  path: string;
  version: string;
  port: number;
  index: number;
  displayName: Record<string, string>;
  children?: RouteModel[];
  icon?: string;
}

export { RemoteInfoModel, RouteModel };
