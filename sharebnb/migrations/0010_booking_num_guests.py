# Generated by Django 3.1.6 on 2021-02-05 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sharebnb', '0009_auto_20210204_0026'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='num_guests',
            field=models.IntegerField(default=2),
        ),
    ]