package com.app;

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
    String domain = chain.request().url().topPrivateDomain();
    Log.d("Skolplattformen", "requseting resource on domain: " + domain);
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
    String originalCookie = chain.request().header("Cookie");
    originalCookie = originalCookie == null ? "" : originalCookie;
    Log.d("Skolplattformen", "OriginalCookie: " + originalCookie);
    Request request = chain.request();

    Response response = chain.proceed(request);

    String location = response.header("Location");
    location = location != null ? location : "";
    Log.d("Skolplattformen", "url=" + response.request().url());
    Log.d("Skolplattformen", "isRedirect=" + response.isRedirect());
    Log.d("Skolplattformen", "responseCode=" + response.code());
    Log.d("Skolplattformen", "redirectUri has length=" + location.length());

    for (int i = 0; i < location.length(); i += 100) {
      Log.d("Skolplattformen", "location>" + location.substring(i, Math.min(i + 100, location.length())));
    }

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

    HttpUrl url = new HttpUrl.Builder().host(domain).scheme("https").build();
    cookieJar.saveFromResponse(url, cookies);

    Log.d("Skolplattformen", "<<<<<<<<<<<<<<<<<<<<< END >>>>>>>>>>>>>>>>>>\n\n");
    return response;

  }
}
