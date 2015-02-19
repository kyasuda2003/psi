from django.contrib.auth.models import User, Group
from proxicode.api.models import Media, Action, Scheduler, Status, Account, Photo, Category, Product
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups','id',)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name','id',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name','id',)

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id','filename',)

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('user','fb_token','is_active','id',)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','code','description','case_pack','case_length','case_width','case_height','cu_ft','wt_lbs','wt_dim_ups','nmfc','_class','pallet_tie','pallet_high','case_pallet','one_plt_wt','categories','photos',)

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ('name','id',)

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ('name','id',)

class SchedulerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scheduler
        fields = ('user','media','action','comment','status','id','created','updated','proxydate')

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('name','id',)

