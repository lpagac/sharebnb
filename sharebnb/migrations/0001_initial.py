# Generated by Django 3.1.6 on 2021-02-02 19:40

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price_per_hour', models.IntegerField(validators=[django.core.validators.MinValueValidator(-1)])),
                ('price_per_day', models.IntegerField(validators=[django.core.validators.MinValueValidator(-1)])),
                ('price_per_month', models.IntegerField(validators=[django.core.validators.MinValueValidator(-1)])),
                ('images_url', models.ImageField(height_field='350px', max_length=250, upload_to='')),
                ('description', models.TextField()),
                ('max_guests', models.IntegerField(validators=[django.core.validators.MinValueValidator(-1)])),
                ('rating', models.IntegerField(validators=[django.core.validators.MinValueValidator(-1), django.core.validators.MaxValueValidator(6)])),
                ('title', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=100)),
                ('listing_type', models.CharField(choices=[('backyard', 'backyard'), ('entire_house', 'entire house'), ('apartment_yard', 'apartment yard')], default='backyard', max_length=20)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]