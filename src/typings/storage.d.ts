declare namespace StorageType{
  interface Session{
    themeColor:string
  }
  interface Local{
    lang:App.I18n.LangType
    token:string
    refreshToken:string
    userInfo:Api.Auth.UserInfo
    themeColor:string
    themeSettings:App.Theme.ThemeSetting
    overrideThemeFlag:string
    globalTabs:App.Global.Tab[]
  }
}
