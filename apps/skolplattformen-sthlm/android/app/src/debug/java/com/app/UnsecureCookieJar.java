package com.app;

import android.util.Log;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

public class UnsecureCookieJar implements CookieJar {

  private Map<String, Cookie> cookies = new HashMap<>();
  @NotNull
  @Override
  public List<Cookie> loadForRequest(@NotNull HttpUrl httpUrl) {
    Log.d("Skolplattformen", "Loading cookies!");
    return new ArrayList<>(cookies.values());
  }

  @Override
  public void saveFromResponse(@NotNull HttpUrl httpUrl, @NotNull List<Cookie> cookieList) {
    Log.d("Skolplattformen", "Saving cookies!");
    if(cookieList != null) {
      for (Cookie c : cookieList) {
        cookies.put(c.name(), c);
      }
      Log.d("Skolplattformen", "Saved cookies! ("+ cookieList.size() +")");
    }
  }
}
