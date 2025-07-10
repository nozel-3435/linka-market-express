import { Download, Smartphone, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const AppDownload = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">{t('app.badge')}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('app.title')}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('app.subtitle')}
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t('app.feature.orders')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t('app.feature.tracking')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t('app.feature.notifications')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{t('app.feature.offers')}</span>
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="btn-primary group flex-1 sm:flex-none">
                <Download className="w-5 h-5 mr-2" />
                {t('app.store.ios')}
              </Button>
              <Button size="lg" variant="outline" className="group flex-1 sm:flex-none border-2">
                <Download className="w-5 h-5 mr-2" />
                {t('app.store.android')}
              </Button>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{t('app.rating')}</span>
              </div>
            </div>
          </div>

          {/* Right Content - App Mockup */}
          <div className="relative">
            <div className="relative mx-auto w-80 h-96 lg:w-96 lg:h-[480px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col">
                    {/* App Header */}
                    <div className="bg-white p-4 pt-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">L</span>
                          </div>
                          <span className="font-bold text-gradient">LinkaMarket</span>
                        </div>
                        <div className="relative">
                          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">3</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mock Products */}
                    <div className="flex-1 p-4 space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="w-20 h-3 bg-gray-200 rounded mb-1"></div>
                            <div className="w-16 h-2 bg-gray-100 rounded"></div>
                          </div>
                          <div className="w-6 h-6 bg-primary/20 rounded"></div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Navigation */}
                    <div className="bg-white p-4 border-t">
                      <div className="flex justify-around">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-6 h-6 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};