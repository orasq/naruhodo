"use client";

import { ThemeMode } from "@/lib/utils/types";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { THEME_COOKIE_KEY } from "@/lib/utils/variants";
import Link from "next/link";

type HeaderProps = {
  initialTheme: ThemeMode;
};

function Header({ initialTheme }: HeaderProps) {
  const [theme, setTheme] = useState(initialTheme);

  function handleThemeToggle() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    Cookies.set(THEME_COOKIE_KEY, newTheme, { expires: 365 });

    document.documentElement.setAttribute("data-color-mode", newTheme);
  }

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between pb-16 pt-7 md:pb-28 md:pt-10">
      {/* Logo */}
      <Link href="/" className="text-xl">
        <svg
          className="w-20 md:w-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 321 119"
        >
          <path
            fill="currentColor"
            d="M31.5092632 44.296C31.5092632 45.456 31.1419298 46.8093333 30.4072632 48.356 29.6725965 49.9026667 28.7639298 51.4106667 27.6812632 52.88 26.5985965 54.3493333 25.5159298 55.548 24.4332632 56.476 23.8145965 57.0173333 22.6932632 57.5393333 21.0692632 58.042 19.4452632 58.5446667 17.8599298 58.332 16.3132632 57.404 14.2252632 56.1666667 12.7365965 54.4266667 11.8472632 52.184 10.9579298 49.9413333 10.3585965 47.8146667 10.0492632 45.804 9.97192982 45.1853333 9.81726316 44.1413333 9.58526316 42.672 9.35326316 41.2026667 9.10192982 39.598 8.83126316 37.858 8.56059649 36.118 8.27059649 34.5133333 7.96126316 33.044 7.65192982 31.5746667 7.34259649 30.492 7.03326316 29.796 6.80126316 29.2546667 6.18259649 28.4426667 5.17726316 27.36 4.17192982 26.2773333 3.16659649 25.1366667 2.16126316 23.938 1.15592982 22.7393333.537263158 21.7533333.305263158 20.98-.0814035088 18.9693333-.100736842 16.92.247263158 14.832.595263158 12.744.962596491 11.3133333 1.34926316 10.54 2.81859649 11.004 4.21059649 11.1393333 5.52526316 10.946 6.83992982 10.7526667 7.88392982 10.2693333 8.65726316 9.496 9.43059649 8.64533333 9.89459649 7.38866667 10.0492632 5.726 10.2039298 4.06333333 10.2039298 2.96133333 10.0492632 2.42 11.8279298 1.724 14.0512632 1.608 16.7192632 2.072 19.3872632 2.536 21.5332632 3.232 23.1572632 4.16 24.8585965 5.01066667 26.1345965 5.9 26.9852632 6.828 27.8359298 7.756 28.8799298 8.41333333 30.1172632 8.8 32.8239298 9.80533333 35.1632632 10.3273333 37.1352632 10.366 39.1072632 10.4046667 40.6925965 10.25 41.8912632 9.902 43.0899298 9.554 43.8825965 9.34133333 44.2692632 9.264 44.8105965 9.10933333 45.3325965 8.95466667 45.8352632 8.8 46.3379298 8.64533333 46.6665965 8.52933333 46.8212632 8.452 48.5225965 11.468 49.2185965 14.136 48.9092632 16.456 48.5999298 18.776 48.1359298 20.4386667 47.5172632 21.444 46.6665965 22.7586667 45.1972632 23.88 43.1092632 24.808 41.0212632 25.736 39.2812632 26.3546667 37.8892632 26.664 36.9612632 26.8186667 35.7819298 27.1473333 34.3512632 27.65 32.9205965 28.1526667 31.5672632 28.81 30.2912632 29.622 29.0152632 30.434 28.1065965 31.4586667 27.5652632 32.696 27.1012632 33.9333333 26.8112632 35.6153333 26.6952632 37.742 26.5792632 39.8686667 27.2559298 41.7053333 28.7252632 43.252 29.2665965 43.7933333 29.8079298 44.1026667 30.3492632 44.18 30.8905965 44.2573333 31.2772632 44.296 31.5092632 44.296ZM70.8332632 37.104C70.1372632 37.1813333 69.3832632 37.278 68.5712632 37.394 67.7592632 37.51 67.1599298 38.0706667 66.7732632 39.076 66.3092632 40.0813333 66.2705965 40.8933333 66.6572632 41.512 67.0439298 42.1306667 67.4692632 42.6333333 67.9332632 43.02 73.0372632 46.732 75.2025965 50.444 74.4292632 54.156 74.1972632 55.1613333 74.4099298 56.1666667 75.0672632 57.172 75.7245965 58.1773333 76.5559298 59.2406667 77.5612632 60.362 78.5665965 61.4833333 79.4945965 62.6626667 80.3452632 63.9 81.1959298 65.1373333 81.6599298 66.4906667 81.7372632 67.96 81.8919298 69.7386667 81.6985965 71.5753333 81.1572632 73.47 80.6159298 75.3646667 78.9532632 77.2013333 76.1692632 78.98 74.3905965 80.14 72.6505965 80.8553333 70.9492632 81.126 69.2479298 81.3966667 67.7399298 81.6093333 66.4252632 81.764 65.1105965 81.9186667 63.9892632 82.4213333 63.0612632 83.272 61.6692632 84.432 60.3159298 85.7853333 59.0012632 87.332 57.6865965 88.8786667 56.4105965 90.3093333 55.1732632 91.624 53.7039298 93.1706667 51.9639298 94.292 49.9532632 94.988 47.9425965 95.684 46.0092632 96.0706667 44.1532632 96.148 42.2972632 96.2253333 40.7892632 96.148 39.6292632 95.916 37.2319298 95.2973333 34.9119298 94.234 32.6692632 92.726 30.4265965 91.218 28.5319298 89.3813333 26.9852632 87.216 26.4439298 86.4426667 25.8832632 85.1086667 25.3032632 83.214 24.7232632 81.3193333 24.3365965 79.1346667 24.1432632 76.66 23.9499298 74.1853333 24.1045965 71.6526667 24.6072632 69.062 25.1099298 66.4713333 26.1345965 64.016 27.6812632 61.696 29.2279298 59.376 31.4319298 57.4813333 34.2932632 56.012 35.1439298 55.548 36.4585965 55.0646667 38.2372632 54.562 40.0159298 54.0593333 41.7365965 53.6146667 43.3992632 53.228 45.0619298 52.8413333 46.1639298 52.6093333 46.7052632 52.532 47.2465965 52.4546667 48.0585965 52.2033333 49.1412632 51.778 50.2239298 51.3526667 51.2679298 50.792 52.2732632 50.096 53.2785965 49.4 53.8972632 48.704 54.1292632 48.008 54.5159298 46.9253333 54.7865965 45.9973333 54.9412632 45.224 55.0959298 44.4506667 55.3279298 43.7933333 55.6372632 43.252 56.4105965 42.2466667 57.0292632 41.3573333 57.4932632 40.584 57.8025965 40.0426667 58.1505965 39.2306667 58.5372632 38.148 58.9239298 37.0653333 58.7692632 36.1373333 58.0732632 35.364 57.3772632 34.5906667 56.6619298 33.8366667 55.9272632 33.102 55.1925965 32.3673333 54.7092632 31.7293333 54.4772632 31.188 53.5492632 28.404 53.2592632 25.8713333 53.6072632 23.59 53.9552632 21.3086667 54.6125965 19.3366667 55.5792632 17.674 56.5459298 16.0113333 57.4545965 14.7546667 58.3052632 13.904 61.0119298 11.12 64.2985965 9.844 68.1652632 10.076 70.7172632 10.2306667 72.9599298 10.8686667 74.8932632 11.99 76.8265965 13.1113333 78.4119298 14.3873333 79.6492632 15.818 80.8865965 17.2486667 81.6599298 18.5053333 81.9692632 19.588 82.8199298 22.604 82.9359298 25.5813333 82.3172632 28.52 82.0079298 30.0666667 81.1185965 31.4973333 79.6492632 32.812 78.1799298 34.1266667 76.9039298 35.016 75.8212632 35.48 73.8879298 36.3306667 72.2252632 36.872 70.8332632 37.104ZM49.0252632 77.472C50.8039298 76.0026667 51.9252632 74.4753333 52.3892632 72.89 52.8532632 71.3046667 52.5439298 70.512 51.4612632 70.512 49.7599298 70.512 48.2905965 70.7826667 47.0532632 71.324 45.8159298 71.8653333 44.6945965 72.484 43.6892632 73.18 43.0705965 73.644 42.3939298 74.3013333 41.6592632 75.152 40.9245965 76.0026667 40.4412632 76.8533333 40.2092632 77.704 39.9772632 78.5546667 40.2092632 79.2506667 40.9052632 79.792 41.9105965 80.5653333 43.2445965 80.604 44.9072632 79.908 46.5699298 79.212 47.9425965 78.4 49.0252632 77.472ZM143.629263 83.32C144.71193 87.8826667 144.228596 92.5033333 142.179263 97.182 140.12993 101.860667 137.05593 105.94 132.957263 109.42 130.173263 111.74 127.041263 113.673333 123.561263 115.22 120.081263 116.766667 116.40793 117.733333 112.541263 118.12 109.91193 118.352 107.031263 118.139333 103.899263 117.482 100.767263 116.824667 97.9059298 115.838667 95.3152632 114.524 92.7245965 113.209333 90.9265965 111.778667 89.9212632 110.232 88.2972632 107.448 87.4659298 104.818667 87.4272632 102.344 87.3885965 99.8693333 87.8525965 97.6073333 88.8192632 95.558 89.7859298 93.5086667 91.0039298 91.7493333 92.4732632 90.28 93.9425965 88.8106667 95.3732632 87.6893333 96.7652632 86.916 99.4719298 85.3693333 102.77793 84.3253333 106.683263 83.784 110.588596 83.2426667 114.242596 82.6626667 117.645263 82.044 119.19193 81.7346667 120.042596 81.0773333 120.197263 80.072 120.35193 79.144 119.385263 78.1773333 117.297263 77.172 115.82793 76.5533333 114.14593 75.8573333 112.251263 75.084 110.356596 74.3106667 108.539263 73.4213333 106.799263 72.416 105.059263 71.4106667 103.64793 70.212 102.565263 68.82 101.482596 67.428 101.018596 65.804 101.173263 63.948 101.32793 61.86 102.236596 60.3713333 103.899263 59.482 105.56193 58.5926667 107.59193 58.032 109.989263 57.8 111.76793 57.6453333 113.314596 56.9686667 114.629263 55.77 115.94393 54.5713333 117.04593 53.16 117.935263 51.536 118.824596 49.912 119.443263 48.3266667 119.791263 46.78 120.139263 45.2333333 120.158596 43.996 119.849263 43.068 119.53993 42.0626667 118.573263 41.3086667 116.949263 40.806 115.325263 40.3033333 113.469263 39.762 111.381263 39.182 109.293263 38.602 107.24393 37.8286667 105.233263 36.862 103.222596 35.8953333 101.637263 34.4453333 100.477263 32.512 99.0079298 30.0373333 98.1572632 27.6786667 97.9252632 25.436 97.6932632 23.1933333 98.3892632 20.0613333 100.013263 16.04 101.173263 16.504 102.990596 17.0066667 105.465263 17.548 107.93993 18.0893333 110.743263 18.7466667 113.875263 19.52 117.007263 20.2933333 120.17793 21.2213333 123.387263 22.304 126.596596 23.3866667 129.51593 24.7013333 132.145263 26.248 134.233263 27.4853333 136.01193 28.858 137.481263 30.366 138.950596 31.874 139.95593 33.5173333 140.497263 35.296 141.11593 37.616 141.270596 40.0906667 140.961263 42.72 140.65193 45.3493333 139.994596 47.9013333 138.989263 50.376 137.98393 52.8506667 136.785263 55.0546667 135.393263 56.988 134.001263 58.9213333 132.609263 60.3906667 131.217263 61.396 128.897263 63.02 128.781263 64.76 130.869263 66.616 131.797263 67.4666667 133.150596 68.7426667 134.929263 70.444 136.70793 72.1453333 138.467263 74.1173333 140.207263 76.36 141.947263 78.6026667 143.08793 80.9226667 143.629263 83.32ZM108.365263 103.62C109.370596 103.465333 110.49193 103.059333 111.729263 102.402 112.966596 101.744667 114.126596 100.952 115.209263 100.024 116.29193 99.096 117.026596 98.0906667 117.413263 97.008 117.79993 95.9253333 117.606596 94.8426667 116.833263 93.76 116.833263 93.76 116.34993 93.8566667 115.383263 94.05 114.416596 94.2433333 113.256596 94.514 111.903263 94.862 110.54993 95.21 109.254596 95.6546667 108.017263 96.196 106.77993 96.7373333 105.929263 97.356 105.465263 98.052 104.45993 99.5213333 104.208596 100.894 104.711263 102.17 105.21393 103.446 106.43193 103.929333 108.365263 103.62ZM180.633263 64.728C181.329263 65.5786667 181.94793 66.004 182.489263 66.004 182.41193 68.788 181.967263 71.282 181.155263 73.486 180.343263 75.69 179.51193 77.4106667 178.661263 78.648 177.733263 79.9626667 176.186596 81.084 174.021263 82.012 171.85593 82.94 169.41993 82.7853333 166.713263 81.548 166.17193 81.316 165.495263 80.7553333 164.683263 79.866 163.871263 78.9766667 163.03993 77.5266667 162.189263 75.516 161.802596 74.588 161.396596 73.0026667 160.971263 70.76 160.54593 68.5173333 160.217263 65.9266667 159.985263 62.988 159.753263 60.0493333 159.67593 57.1106667 159.753263 54.172 159.67593 53.3213333 159.67593 51.6393333 159.753263 49.126 159.830596 46.6126667 159.96593 43.674 160.159263 40.31 160.352596 36.946 160.584596 33.5046667 160.855263 29.986 161.12593 26.4673333 161.377263 23.2386667 161.609263 20.3 161.841263 17.3613333 161.99593 15.08 162.073263 13.456 162.22793 11.4453333 162.28593 9.06733333 162.247263 6.322 162.208596 3.57666667 162.150596 1.46933333 162.073263-5.68434189e-14 164.393263.232 166.539263.889333333 168.511263 1.972 170.483263 3.05466667 172.223263 4.15666667 173.731263 5.278 175.239263 6.39933333 176.341263 7.26933333 177.037263 7.888 178.35193 9.35733333 179.260596 11.252 179.763263 13.572 180.26593 15.892 180.536596 18.2893333 180.575263 20.764 180.61393 23.2386667 180.517263 25.4813333 180.285263 27.492 180.130596 28.9613333 179.956596 30.856 179.763263 33.176 179.56993 35.496 179.357263 37.9126667 179.125263 40.426 178.893263 42.9393333 178.719263 45.2593333 178.603263 47.386 178.487263 49.5126667 178.46793 51.156 178.545263 52.316 178.622596 53.8626667 178.738596 55.506 178.893263 57.246 179.04793 58.986 179.27993 60.552 179.589263 61.944 179.898596 63.336 180.246596 64.264 180.633263 64.728ZM246.405263 51.968C246.405263 53.9013333 245.883263 55.738 244.839263 57.478 243.795263 59.218 242.538596 60.7453333 241.069263 62.06 240.06393 62.8333333 239.213263 64.1673333 238.517263 66.062 237.821263 67.9566667 237.260596 69.8706667 236.835263 71.804 236.40993 73.7373333 236.042596 75.284 235.733263 76.444 234.650596 80.62 232.852596 83.636 230.339263 85.492 227.82593 87.348 225.061263 88.624 222.045263 89.32 218.874596 90.016 215.626596 90.248 212.301263 90.016 208.97593 89.784 205.805263 88.9333333 202.789263 87.464 199.773263 85.9946667 197.182596 83.7906667 195.017263 80.852 193.77993 79.228 193.006596 76.966 192.697263 74.066 192.38793 71.166 192.85193 68.3626667 194.089263 65.656 195.249263 63.0266667 196.91193 60.9 199.077263 59.276 201.242596 57.652 203.34993 56.2986667 205.399263 55.216 207.448596 54.1333333 208.85993 53.1666667 209.633263 52.316 209.865263 51.9293333 210.19393 51.4653333 210.619263 50.924 211.044596 50.3826667 211.141263 49.764 210.909263 49.068 210.677263 48.4493333 210.25193 48.0433333 209.633263 47.85 209.014596 47.6566667 208.473263 47.5213333 208.009263 47.444 206.385263 47.3666667 204.761263 47.4053333 203.137263 47.56 201.513263 47.7146667 199.657263 47.8693333 197.569263 48.024 196.33193 48.1013333 195.152596 47.8113333 194.031263 47.154 192.90993 46.4966667 192.001263 45.5493333 191.305263 44.312 190.377263 42.7653333 189.816596 41.006 189.623263 39.034 189.42993 37.062 189.83593 35.1866667 190.841263 33.408 192.61993 33.7946667 194.669263 33.9493333 196.989263 33.872 199.309263 33.7946667 201.358596 33.524 203.137263 33.06 205.766596 32.4413333 207.951263 31.726 209.691263 30.914 211.431263 30.102 212.22393 29.0773333 212.069263 27.84 211.99193 27.2213333 211.431263 26.8153333 210.387263 26.622 209.343263 26.4286667 208.39593 26.2933333 207.545263 26.216 206.77193 26.0613333 205.49593 25.868 203.717263 25.636 201.938596 25.404 200.198596 25.2106667 198.497263 25.056 196.409263 24.9013333 194.688596 24.302 193.335263 23.258 191.98193 22.214 190.87993 20.9186667 190.029263 19.372 188.79193 16.6653333 188.289263 13.572 188.521263 10.092 189.37193 10.1693333 190.976596 10.2466667 193.335263 10.324 195.69393 10.4013333 198.36193 10.44 201.339263 10.44 204.316596 10.44 207.17793 10.4206667 209.923263 10.382 212.668596 10.3433333 214.814596 10.2853333 216.361263 10.208 218.449263 9.976 220.769263 9.72466667 223.321263 9.454 225.873263 9.18333333 228.367263 8.79666667 230.803263 8.294 233.239263 7.79133333 235.230596 7.15333333 236.777263 6.38 238.942596 8.468 240.373263 10.556 241.069263 12.644 241.765263 14.732 241.997263 16.646 241.765263 18.386 241.533263 20.126 240.99193 21.46 240.141263 22.388 239.754596 22.852 238.981263 23.3933333 237.821263 24.012 236.661263 24.6306667 235.617263 25.3073333 234.689263 26.042 233.761263 26.7766667 233.413263 27.5693333 233.645263 28.42 233.79993 28.7293333 234.186596 29 234.805263 29.232 235.42393 29.464 236.11993 29.6573333 236.893263 29.812 237.74393 29.9666667 238.652596 30.218 239.619263 30.566 240.58593 30.914 241.378596 31.204 241.997263 31.436 243.31193 31.9773333 244.18193 32.9246667 244.607263 34.278 245.032596 35.6313333 245.28393 36.656 245.361263 37.352 245.361263 39.44 245.071263 40.8126667 244.491263 41.47 243.911263 42.1273333 243.350596 42.572 242.809263 42.804 242.26793 43.036 241.958596 43.616 241.881263 44.544 241.881263 45.472 242.248596 46.2453333 242.983263 46.864 243.71793 47.4826667 244.47193 48.14 245.245263 48.836 246.018596 49.532 246.405263 50.576 246.405263 51.968ZM220.073263 71.688C220.305263 71.5333333 220.74993 71.0693333 221.407263 70.296 222.064596 69.5226667 222.567263 68.672 222.915263 67.744 223.263263 66.816 223.089263 66.0813333 222.393263 65.54 221.61993 64.9213333 220.63393 64.9213333 219.435263 65.54 218.236596 66.1586667 217.09593 66.932 216.013263 67.86 215.70393 68.092 215.104596 68.5946667 214.215263 69.368 213.32593 70.1413333 212.62993 70.9533333 212.127263 71.804 211.624596 72.6546667 211.721263 73.428 212.417263 74.124 213.03593 74.6653333 213.828596 74.8393333 214.795263 74.646 215.76193 74.4526667 216.74793 74.0466667 217.753263 73.428 218.758596 72.8093333 219.53193 72.2293333 220.073263 71.688ZM311.701263 13.624C311.237263 13.9333333 310.966596 14.3973333 310.889263 15.016 310.81193 15.6346667 310.676596 16.3113333 310.483263 17.046 310.28993 17.7806667 309.729263 18.496 308.801263 19.192 307.79593 19.9653333 306.63593 20.2166667 305.321263 19.946 304.006596 19.6753333 302.885263 18.96 301.957263 17.8 301.029263 16.64 300.584596 15.3833333 300.623263 14.03 300.66193 12.6766667 301.18393 11.6133333 302.189263 10.84 303.27193 9.98933333 304.393263 9.66066667 305.553263 9.854 306.713263 10.0473333 307.641263 9.87333333 308.337263 9.332 308.878596 8.94533333 309.168596 8.462 309.207263 7.882 309.24593 7.302 309.36193 6.64466667 309.555263 5.91 309.748596 5.17533333 310.309263 4.42133333 311.237263 3.648 312.242596 2.87466667 313.402596 2.64266667 314.717263 2.952 316.03193 3.26133333 317.153263 3.996 318.081263 5.156 319.009263 6.316 319.45393 7.55333333 319.415263 8.868 319.376596 10.1826667 318.854596 11.2653333 317.849263 12.116 316.921263 12.8893333 316.070596 13.2953333 315.297263 13.334 314.52393 13.3726667 313.847263 13.334 313.267263 13.218 312.687263 13.102 312.165263 13.2373333 311.701263 13.624ZM281.889263 8.636C283.977263 9.40933333 285.620596 10.8013333 286.819263 12.812 288.01793 14.8226667 288.926596 17.104 289.545263 19.656 290.16393 22.208 290.550596 24.6826667 290.705263 27.08 290.705263 27.312 290.68593 28.008 290.647263 29.168 290.608596 30.328 290.62793 31.546 290.705263 32.822 290.782596 34.098 291.053263 35.084 291.517263 35.78 291.981263 36.476 292.94793 36.9206667 294.417263 37.114 295.886596 37.3073333 297.35593 37.2493333 298.825263 36.94 299.830596 36.6306667 301.087263 36.2246667 302.595263 35.722 304.103263 35.2193333 305.59193 34.5233333 307.061263 33.634 308.530596 32.7446667 309.613263 31.6426667 310.309263 30.328 311.546596 31.256 312.861263 32.416 314.253263 33.808 315.645263 35.2 316.534596 36.3213333 316.921263 37.172 318.00393 39.492 318.545263 41.58 318.545263 43.436 318.545263 45.292 317.965263 47.3413333 316.805263 49.584 316.26393 50.5893333 315.181263 51.6333333 313.557263 52.716 311.933263 53.7986667 310.077263 54.572 307.989263 55.036 307.67993 55.1133333 306.80993 55.326 305.379263 55.674 303.948596 56.022 302.498596 56.3893333 301.029263 56.776 299.55993 57.1626667 298.51593 57.5106667 297.897263 57.82 296.969263 58.2066667 295.403263 59.1346667 293.199263 60.604 290.995263 62.0733333 288.77193 64.4706667 286.529263 67.796 285.75593 69.0333333 285.079263 70.3866667 284.499263 71.856 283.919263 73.3253333 283.513263 75.22 283.281263 77.54 283.20393 79.3186667 283.687263 81.252 284.731263 83.34 285.775263 85.428 286.954596 86.7813333 288.269263 87.4 289.197263 87.864 290.183263 88.3086667 291.227263 88.734 292.271263 89.1593333 293.17993 89.6813333 293.953263 90.3 295.190596 91.228 295.886596 92.5233333 296.041263 94.186 296.19593 95.8486667 295.944596 97.5693333 295.287263 99.348 294.62993 101.126667 293.64393 102.750667 292.329263 104.22 291.09193 105.612 289.58393 106.714 287.805263 107.526 286.026596 108.338 284.054596 108.628 281.889263 108.396 279.95593 108.164 277.732596 107.236 275.219263 105.612 272.70593 103.988 270.637263 102.132 269.013263 100.044 268.549263 99.4253333 267.77593 98.13 266.693263 96.158 265.610596 94.186 264.58593 91.866 263.619263 89.198 262.652596 86.53 262.09193 83.8426667 261.937263 81.136 261.782596 77.5013333 262.401263 73.6926667 263.793263 69.71 265.185263 65.7273333 267.234596 62.2666667 269.941263 59.328 271.02393 58.168 271.797263 56.834 272.261263 55.326 272.725263 53.818 272.957263 52.6 272.957263 51.672 272.957263 51.0533333 272.744596 50.0866667 272.319263 48.772 271.89393 47.4573333 271.48793 46.0073333 271.101263 44.422 270.714596 42.8366667 270.482596 41.3093333 270.405263 39.84 270.405263 39.2213333 270.366596 38.042 270.289263 36.302 270.21193 34.562 270.09593 32.6286667 269.941263 30.502 269.786596 28.3753333 269.651263 26.442 269.535263 24.702 269.419263 22.962 269.28393 21.7826667 269.129263 21.164 268.897263 19.8493333 268.52993 18.1866667 268.027263 16.176 267.524596 14.1653333 266.73193 12.348 265.649263 10.724 267.42793 9.48666667 269.45793 8.694 271.739263 8.346 274.020596 7.998 276.147263 7.90133333 278.119263 8.056 280.091263 8.21066667 281.34793 8.404 281.889263 8.636Z"
            transform="translate(.675 .072)"
          />
        </svg>
      </Link>

      <div>
        {/* Light / Dark theme toggle */}
        <button
          onClick={handleThemeToggle}
          aria-label={`Toggle theme | Current theme: ${theme}`}
          className="motion-safe:transition-background flex h-[45px] w-[45px] items-center justify-center rounded-xl duration-100 hover:bg-surface-light hover:shadow-sm"
        >
          {theme === "light" ? <IconSunFilled /> : <IconMoonFilled />}
        </button>
      </div>
    </header>
  );
}

export default Header;
