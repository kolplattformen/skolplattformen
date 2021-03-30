package org.skolplattformen.modules;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.network.ForwardingCookieHandler;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;

import okhttp3.CookieJar;
import okhttp3.OkHttpClient;

public class OkHttpClientFactoryCustom implements OkHttpClientFactory {

    private final ReactContext context;

    public OkHttpClientFactoryCustom(ReactContext context) {
        super();
        this.context = context;
    }

    @Override
    public OkHttpClient createNewNetworkModuleClient() {

        OkHttpClient.Builder builder = OkHttpClientProvider.createClientBuilder(this.context);
        CookieJarCustom cookieJarCustom = new CookieJarCustom(new ForwardingCookieHandler(this.context));

            builder.cookieJar(new ReactCookieJarContainer() {

                @Override
                public void setCookieJar(CookieJar cookieJar) {
                    super.setCookieJar(cookieJarCustom);
                }
            });

        return builder.build();
    }
}
