export class ConfigurationService {
    public static baseURLKey = "BASE_URL";

    private static instance: ConfigurationService | undefined;

    private constructor() {}

    public static GetInstance() {
        return (this.instance ??= new ConfigurationService());
    }

    public SetConfiguration(configuration: Configuration) {
        localStorage.setItem(
            ConfigurationService.baseURLKey,
            configuration.baseURL ?? "",
        );
    }

    public Get(key: string) {
        return localStorage.getItem(key);
    }

    public Remove(key: string) {
        localStorage.removeItem(key);
    }

    public GetConfiguration(): Configuration {
        return {
            baseURL: this.Get(ConfigurationService.baseURLKey) as string,
        };
    }

    public RestoreConfiguration() {
        localStorage.removeItem(ConfigurationService.baseURLKey);
    }
}
