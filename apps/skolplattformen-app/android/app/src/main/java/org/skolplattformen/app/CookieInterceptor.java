package org.skolplattformen.app;

import android.util.Log;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import kotlin.Pair;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

class CookieInterceptor implements Interceptor {
  private final List<Cookie> cookies;
  private final CookieJar cookieJar;

  public CookieInterceptor(CookieJar cookieJar) {
    this.cookies = new ArrayList<>();
    this.cookieJar = cookieJar;
  }

  @NotNull
  @Override
  public Response intercept(@NotNull Chain chain) throws IOException {
    // TODO: Clean up the code so only the necessary feeding of cookies to
    // the cookie jar remains. That is needed because of:
    // https://reactnative.dev/docs/0.64/network#known-issues-with-fetch-and-cookie-based-authentication
    // Specifically react native's fetch does not respect multiple `set-cookie` headers and only
    // seem to set one cookie per request. Some of the login calls in the api-hjarntorget lib
    // receives multiple `set-cookie` headers.
    String domain = chain.request().url().topPrivateDomain();
    Log.d("Skolplattformen", "requesting resource on domain: " + domain);
    if(domain == null || !domain.contains("goteborg.se") && !domain.contains("funktionstjanster.se")) {
      return chain.proceed(chain.request());
    }

    Log.d("Skolplattformen", "\n\n<<<<<<<<<<<<<<<<<<<<< BEGIN >>>>>>>>>>>>>>>>>>");
    Log.d("Skolplattformen", "" + chain.request().method() + " " + chain.request().url());
    Log.d("Skolplattformen", "url have length: " + chain.request().url().toString().length());
    Iterator<Pair<String, String>> iterator = chain.request().headers().iterator();
    while (iterator.hasNext()) {
      Pair<String, String> header = iterator.next();
      Log.d("Skolplattformen", "SENT " + header.getFirst() + ": " + header.getSecond() + "");
    }
    Request request = chain.request();
    Response response = chain.proceed(request);

    String location = response.header("Location");
    location = location != null ? location : "";
    Log.d("Skolplattformen", "url=" + response.request().url());
    Log.d("Skolplattformen", "isRedirect=" + response.isRedirect());
    Log.d("Skolplattformen", "responseCode=" + response.code());
    Log.d("Skolplattformen", "redirectUri has length=" + location.length());

    iterator = response.headers().iterator();
    cookies.clear();
    while (iterator.hasNext()) {
      Pair<String, String> header = iterator.next();
      Log.d("Skolplattformen", "RECEIVED " + header.getFirst() + ": " + header.getSecond() + "");
      if (header.getFirst().equals("Set-Cookie")) {
        Cookie c = Cookie.parse(response.request().url(), header.getSecond());
        cookies.add(c);
      }
    }

    HttpUrl url = new HttpUrl.Builder().host(request.url().host()).scheme("https").build();
    cookieJar.saveFromResponse(url, cookies);
    Log.d("Skolplattformen", "<<<<<<<<<<<<<<<<<<<<< END >>>>>>>>>>>>>>>>>>\n\n");
    return response;

  }
}
