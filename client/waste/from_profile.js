<GridContainer justify='center'>
  <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
    <NavPills
      alignCenter
      color='primary'
      tabs={[
        {
          tabButton: "Studio",
          tabIcon: Camera,
          tabContent: (
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={4}>
                <img alt='...' src={studio1} className={navImageClasses} />
                <img alt='...' src={studio2} className={navImageClasses} />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <img alt='...' src={studio5} className={navImageClasses} />
                <img alt='...' src={studio4} className={navImageClasses} />
              </GridItem>
            </GridContainer>
          ),
        },
        {
          tabButton: "Work",
          tabIcon: Palette,
          tabContent: (
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={4}>
                <img alt='...' src={work1} className={navImageClasses} />
                <img alt='...' src={work2} className={navImageClasses} />
                <img alt='...' src={work3} className={navImageClasses} />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <img alt='...' src={work4} className={navImageClasses} />
                <img alt='...' src={work5} className={navImageClasses} />
              </GridItem>
            </GridContainer>
          ),
        },
        {
          tabButton: "Favorite",
          tabIcon: Favorite,
          tabContent: (
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={4}>
                <img alt='...' src={work4} className={navImageClasses} />
                <img alt='...' src={studio3} className={navImageClasses} />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <img alt='...' src={work2} className={navImageClasses} />
                <img alt='...' src={work1} className={navImageClasses} />
                <img alt='...' src={studio1} className={navImageClasses} />
              </GridItem>
            </GridContainer>
          ),
        },
      ]}
    />
  </GridItem>
</GridContainer>;
